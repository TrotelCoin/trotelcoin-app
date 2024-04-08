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

  if (!wallet || !quizId || !multipliers) {
    return NextResponse.json("Parameters not found", { status: 400 });
  }

  // reset rewards if 24h has passed
  const { error } = await supabase
    .from("algorithm")
    .update({ remaining_rewards: remainingRewards })
    .lt("updated_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // check if user exists
  const { data: userExistence, error: userExistenceError } = await supabase
    .from("learners")
    .select("wallet")
    .eq("wallet", wallet as Address);

  if (userExistenceError) {
    console.error(userExistenceError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // insert user if doesn't exist
  if (!userExistence || userExistence.length === 0) {
    const { error: insertLearnersError } = await supabase
      .from("learners")
      .insert([
        {
          wallet: wallet as Address,
          total_rewards_pending: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

    if (insertLearnersError) {
      console.error(insertLearnersError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  // if user already answered the quiz return error
  const { data: quizAnswered, error: quizAnsweredError } = await supabase
    .from("quizzes_answered")
    .select("wallet")
    .eq("wallet", wallet as Address)
    .eq("quiz_id", quizId);

  if (quizAnsweredError) {
    console.error(quizAnsweredError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  if (quizAnswered && quizAnswered.length > 0) {
    console.error("User already answered the quiz");
    return NextResponse.json(
      { error: "User already answered the quiz." },
      {
        status: 400,
      }
    );
  }

  // get remaining rewards
  const { data: algorithmData, error: algorithmError } = await supabase
    .from("algorithm")
    .select("remaining_rewards");

  if (algorithmError) {
    console.error(algorithmError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // check if quiz exists
  const { data: quizExistence, error: quizExistenceError } = await supabase
    .from("quizzes")
    .select("quiz_id")
    .eq("quiz_id", quizId);

  if (quizExistenceError) {
    console.error(quizExistenceError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // if quiz doesn't exist return error
  if (!quizExistence || quizExistence.length === 0) {
    const isCourseAvailable = checkIfCourseIsAvailable(quizId);

    if (isCourseAvailable) {
      const { error } = await supabase.from("quizzes").insert({
        quiz_id: quizId,
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
          status: 404,
        }
      );
    }
  }

  // calculate rewards
  const remainingRewardsValue = algorithmData[0].remaining_rewards;
  const rewards = calculateRewards(remainingRewardsValue, multipliers);

  // get total rewards pending of user
  const { data: totalRewardsPendingData, error: totalRewardsPendingError } =
    await supabase
      .from("learners")
      .select("total_rewards_pending")
      .eq("wallet", wallet as Address);

  if (totalRewardsPendingError) {
    console.error(totalRewardsPendingError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // get number of quizzes answered
  const {
    data: numberOfQuizzesAnsweredData,
    error: numberOfQuizzesAnsweredError,
  } = await supabase
    .from("learners")
    .select("number_of_quizzes_answered")
    .eq("wallet", wallet as Address);

  if (numberOfQuizzesAnsweredError) {
    console.error(numberOfQuizzesAnsweredError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // update total rewards pending
  const totalRewardsPending =
    totalRewardsPendingData[0]?.total_rewards_pending ?? 0;

  const numberOfQuizzesAnswered =
    numberOfQuizzesAnsweredData[0]?.number_of_quizzes_answered ?? 0;

  const { error: updateLearnersError } = await supabase
    .from("learners")
    .update({
      total_rewards_pending: totalRewardsPending + rewards,
      updated_at: new Date().toISOString(),
      number_of_quizzes_answered: numberOfQuizzesAnswered + 1,
    })
    .eq("wallet", wallet as Address);

  if (updateLearnersError) {
    console.error(updateLearnersError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // insert quiz answered
  const { error: insertQuizzesAnsweredError } = await supabase
    .from("quizzes_answered")
    .insert([
      {
        wallet: wallet as Address,
        quiz_id: quizId,
        answered: true,
        answered_at: new Date().toISOString(),
      },
    ]);

  if (insertQuizzesAnsweredError) {
    console.error(insertQuizzesAnsweredError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // update remaining rewards
  const { error: updateAlgorithmError } = await supabase
    .from("algorithm")
    .update({
      remaining_rewards: remainingRewardsValue - rewards / 50,
    })
    .eq("id", 1);

  if (updateAlgorithmError) {
    console.error(updateAlgorithmError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  const { error: updateAlgorithmDateError } = await supabase
    .from("algorithm")
    .update({
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (updateAlgorithmDateError) {
    console.error(updateAlgorithmDateError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // get number of answers
  const { data: currentQuizData, error: fetchQuizError } = await supabase
    .from("quizzes")
    .select("number_of_answers")
    .eq("quiz_id", quizId);

  if (fetchQuizError) {
    console.error(fetchQuizError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  const currentNumberOfAnswers = currentQuizData[0]?.number_of_answers ?? 0;

  // update number of answers and last answered at
  const { error: updateQuizzesError } = await supabase
    .from("quizzes")
    .update({
      number_of_answers: currentNumberOfAnswers + 1,
      last_answered_at: new Date().toISOString(),
    })
    .eq("quiz_id", quizId);

  if (updateQuizzesError) {
    console.error(updateQuizzesError);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
