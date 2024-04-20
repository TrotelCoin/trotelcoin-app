import { supabase } from "@/lib/supabase/db";
import { calculateRewards } from "@/utils/calculateRewards";
import remainingRewards from "@/data/constants/remainingRewards";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { checkIfCourseIsAvailable } from "@/lib/quizzes/quizzes";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet: Address = searchParams.get("wallet") as Address;
  const quizId: number = Number(searchParams.get("quizId"));
  const multipliers: number = Number(searchParams.get("multipliers"));

  try {
    // reset rewards if 24h has passed
    await supabase
      .from("algorithm")
      .update({
        remaining_rewards: remainingRewards,
        updated_at: new Date().toISOString(),
      })
      .lte(
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
          updated_at: new Date().toISOString(),
        },
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
          status: 404,
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
        await supabase.from("quizzes").insert({
          quiz_id: quizId,
        });
      } else {
        console.error("Quiz not found with the specified quizId");
        return NextResponse.json(
          { error: "Quiz not found." },
          {
            status: 404,
          }
        );
      }
    }

    if (!algorithmData || algorithmData.length === 0) {
      console.error("Algorithm data not found.");
      return NextResponse.json(
        { error: "Algorithm data not found." },
        {
          status: 404,
        }
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

    if (!totalRewardsPendingData || totalRewardsPendingData.length === 0) {
      console.error("Total rewards pending not found.");
      return NextResponse.json(
        { error: "Total rewards pending not found." },
        {
          status: 404,
        }
      );
    }

    if (
      !numberOfQuizzesAnsweredData ||
      numberOfQuizzesAnsweredData.length === 0
    ) {
      console.error("Number of quizzes answered not found.");
      return NextResponse.json(
        { error: "Number of quizzes answered not found." },
        {
          status: 404,
        }
      );
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
        number_of_quizzes_answered: numberOfQuizzesAnswered + 1,
      })
      .eq("wallet", wallet);

    // insert quiz answered
    await supabase.from("quizzes_answered").insert([
      {
        wallet: wallet,
        quiz_id: quizId,
        answered: true,
        answered_at: new Date().toISOString(),
      },
    ]);

    // update remaining rewards
    await supabase
      .from("algorithm")
      .update({
        remaining_rewards: remainingRewardsValue - rewards / 50,
      })
      .eq("id", 1);

    // get number of answers
    const { data: currentQuizData } = await supabase
      .from("quizzes")
      .select("number_of_answers")
      .eq("quiz_id", quizId);

    if (!currentQuizData || currentQuizData.length === 0) {
      console.error("Quiz not found.");
      return NextResponse.json(
        { error: "Quiz not found." },
        {
          status: 404,
        }
      );
    }

    const currentNumberOfAnswers = currentQuizData[0]?.number_of_answers ?? 0;

    // update number of answers and last answered at
    await supabase
      .from("quizzes")
      .update({
        number_of_answers: currentNumberOfAnswers + 1,
        last_answered_at: new Date().toISOString(),
      })
      .eq("quiz_id", quizId);

    return NextResponse.json(
      { success: true, rewards: rewards },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
