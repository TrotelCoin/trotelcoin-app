import remainingRewards from "@/data/rewards/remainingRewards";
import { checkIfCourseIsAvailable } from "@/utils/quizzes/checkIfCourseIsAvailable";
import { calculateRewards } from "@/utils/rewards/calculateRewards";
import { supabase } from "@/utils/supabase/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

/* GET /api/rewards
 * Returns the total rewards pending.
 * @returns {number} total_rewards_pending - The total rewards pending.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase
      .from("learners")
      .select("total_rewards_pending");

    if (!data) {
      return NextResponse.json(0, { status: 404 });
    }

    const total_rewards_pending_sum = data.reduce(
      (acc, curr) => acc + curr.total_rewards_pending,
      0
    );
    return NextResponse.json(total_rewards_pending_sum, {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    return NextResponse.json(0, { status: 500 });
  }
}

const inputSchema = z.object({
  wallet: z.string(),
  quizId: z.number(),
  multipliers: z.number()
});

/* POST /api/rewards
 * Updates the rewards of a user.
 * @param {string} wallet - The wallet of the user.
 * @param {number} quizId - The id of the quiz.
 * @param {number} multipliers - The multipliers of the quiz.
 * @returns {object} rewards - The rewards of the user.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "You need to be logged in to answer quizzes." },
      { status: 401 }
    );
  }

  try {
    const { wallet, quizId, multipliers } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
      quizId: Number(searchParams.get("quizId")),
      multipliers: Number(searchParams.get("multipliers"))
    }).data as unknown as {
      wallet: Address;
      quizId: number;
      multipliers: number;
    };

    // reset rewards if 24h has passed
    await supabase
      .from("algorithm")
      .update({ remaining_rewards: remainingRewards })
      .lt(
        "updated_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      );

    // check if user exists
    const { data: userExistence } = await supabase
      .from("learners")
      .select("wallet")
      .eq("wallet", wallet);

    // insert user if doesn't exist
    if (!userExistence || userExistence.length === 0) {
      await supabase.from("learners").insert([
        {
          wallet: wallet,
          total_rewards_pending: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    }

    // if user already answered the quiz return error
    const { data: quizAnswered } = await supabase
      .from("quizzes_answered")
      .select("wallet")
      .eq("wallet", wallet)
      .eq("quiz_id", quizId);

    if (quizAnswered && quizAnswered.length > 0) {
      console.error("User already answered the quiz");
      return NextResponse.json(
        { error: "User already answered the quiz." },
        {
          status: 404
        }
      );
    }

    // get remaining rewards
    const { data: algorithmData } = await supabase
      .from("algorithm")
      .select("remaining_rewards");

    // check if quiz exists
    const { data: quizExistence } = await supabase
      .from("quizzes")
      .select("quiz_id")
      .eq("quiz_id", quizId);

    // if quiz doesn't exist, create it if available
    if (!quizExistence || quizExistence.length === 0) {
      const isCourseAvailable = checkIfCourseIsAvailable(quizId);

      if (isCourseAvailable) {
        const { error } = await supabase.from("quizzes").insert({
          quiz_id: quizId
        });

        if (error) {
          console.error(error);
          return NextResponse.json(error, { status: 500 });
        }
      } else {
        console.error("Quiz not found with the specified quizId");
        return NextResponse.json(
          { error: "Quiz not found." },
          {
            status: 404
          }
        );
      }
    }

    if (!algorithmData) {
      return NextResponse.json(
        { error: "Algorithm data not found." },
        { status: 404 }
      );
    }

    // calculate rewards
    const remainingRewardsValue = algorithmData[0].remaining_rewards;
    const rewards = calculateRewards(remainingRewardsValue, multipliers);

    // get total rewards pending of user
    const { data: totalRewardsPendingData } = await supabase
      .from("learners")
      .select("total_rewards_pending")
      .eq("wallet", wallet);

    // get number of quizzes answered
    const { data: numberOfQuizzesAnsweredData } = await supabase
      .from("learners")
      .select("number_of_quizzes_answered")
      .eq("wallet", wallet);

    if (!totalRewardsPendingData) {
      return NextResponse.json({ error: "Wallet not found." }, { status: 404 });
    }

    if (!numberOfQuizzesAnsweredData) {
      return NextResponse.json({ error: "Wallet not found." }, { status: 404 });
    }

    // update total rewards pending
    const totalRewardsPending =
      totalRewardsPendingData[0]?.total_rewards_pending ?? 0;

    const numberOfQuizzesAnswered =
      numberOfQuizzesAnsweredData[0]?.number_of_quizzes_answered ?? 0;

    await supabase
      .from("learners")
      .update({
        total_rewards_pending: totalRewardsPending + rewards,
        updated_at: new Date().toISOString(),
        number_of_quizzes_answered: numberOfQuizzesAnswered + 1
      })
      .eq("wallet", wallet);

    // insert quiz answered
    await supabase.from("quizzes_answered").insert([
      {
        wallet: wallet,
        quiz_id: quizId,
        answered: true,
        answered_at: new Date().toISOString()
      }
    ]);

    // update remaining rewards
    await supabase
      .from("algorithm")
      .update({
        remaining_rewards: remainingRewardsValue - rewards / 50
      })
      .eq("id", 1);

    await supabase
      .from("algorithm")
      .update({
        updated_at: new Date().toISOString()
      })
      .eq("id", 1);

    // get number of answers
    const { data: currentQuizData } = await supabase
      .from("quizzes")
      .select("number_of_answers")
      .eq("quiz_id", quizId);

    if (!currentQuizData) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    const currentNumberOfAnswers = currentQuizData[0]?.number_of_answers ?? 0;

    // update number of answers and last answered at
    await supabase
      .from("quizzes")
      .update({
        number_of_answers: currentNumberOfAnswers + 1,
        last_answered_at: new Date().toISOString()
      })
      .eq("quiz_id", quizId);

    return NextResponse.json(
      { success: true, rewards: rewards },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
