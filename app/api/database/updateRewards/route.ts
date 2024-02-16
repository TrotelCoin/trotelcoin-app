import { supabase } from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";
import remainingRewards from "@/data/remainingRewards";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const wallet = searchParams.get("wallet");
  const quizId = searchParams.get("quizId");

  try {
    // reset rewards if 24h has passed
    try {
      const { error } = await supabase
        .from("algorithm")
        .update({ remaining_rewards: remainingRewards })
        .lt(
          "updated_at",
          new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        );

      if (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    // fetch remaining rewards
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
      console.error("Quiz not found with the specified quizId");
      return NextResponse.json(
        { error: "Quiz not found." },
        {
          status: 404,
        }
      );
    }

    // calculate rewards
    const remainingRewardsValue = algorithmData[0].remaining_rewards;
    const rewards = calculateRewards(remainingRewardsValue);

    // insert rewards and quiz data
    const { error: insertError1 } = await supabase
      .from("learners")
      .upsert([{ wallet: wallet as Address, total_rewards_pending: rewards }], {
        onConflict: "wallet",
      });

    // insert rewards and quiz data
    const { error: insertError2 } = await supabase
      .from("quizzes_answered")
      .upsert(
        [
          {
            wallet: wallet as Address,
            quiz_id: quizId,
            answered: true,
            answered_at: new Date().toISOString(),
          },
        ],
        {
          onConflict: "id",
        }
      );

    if (insertError1 || insertError2) {
      console.error("Error inserting data into learners or quizzes_answered");
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    // update remaining rewards
    const { error: updateAlgorithmError } = await supabase
      .from("algorithm")
      .update({ remaining_rewards: remainingRewardsValue - rewards / 50 });

    // update number of answers and last answered at
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
      .update({ number_of_answers: currentNumberOfAnswers + 1 })
      .eq("quiz_id", quizId);

    // insert quiz if it doesn't exist
    const { error: insertQuizzesError } = await supabase
      .from("quizzes")
      .upsert(
        [{ quiz_id: quizId, last_answered_at: new Date().toISOString() }],
        {
          onConflict: "quiz_id",
        }
      );

    // insert learner if it doesn't exist
    const { error: insertLearnersError } = await supabase
      .from("learners")
      .upsert([{ wallet, number_of_quizzes_answered: 1 }], {
        onConflict: "wallet",
      });

    if (
      updateAlgorithmError ||
      updateQuizzesError ||
      insertQuizzesError ||
      insertLearnersError
    ) {
      console.error("Error updating data in algorithm, quizzes, or learners");
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      {
        status: 500,
      }
    );
  }
}
