import { supabase } from "@/lib/db";
import { calculateRewards } from "@/lib/calculateRewards";
import remainingRewards from "@/data/remainingRewards";
import { NextRequest, NextResponse } from "next/server";

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
        return new NextResponse(
          JSON.stringify({ error: "Something went wrong." }),
          { status: 500 }
        );
      }
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    const { data: algorithmData, error: algorithmError } = await supabase
      .from("algorithm")
      .select("remaining_rewards");

    if (algorithmError) {
      console.error(algorithmError);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    const remainingRewardsValue = algorithmData[0].remaining_rewards;
    const rewards = calculateRewards(remainingRewardsValue);

    const { error: insertError1 } = await supabase
      .from("learners")
      .upsert([{ wallet, total_rewards_pending: rewards }], {
        onConflict: "wallet",
      });

    const { error: insertError2 } = await supabase
      .from("quizzes_answered")
      .upsert(
        [
          {
            wallet,
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
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    const { error: updateAlgorithmError } = await supabase
      .from("algorithm")
      .update({ remaining_rewards: remainingRewardsValue - rewards / 50 });

    const { data: currentQuizData, error: fetchQuizError } = await supabase
      .from("quizzes")
      .select("number_of_answers")
      .eq("quiz_id", quizId);

    if (fetchQuizError) {
      console.error(fetchQuizError);
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    const currentNumberOfAnswers = currentQuizData[0]?.number_of_answers || 0;

    const { error: updateQuizzesError } = await supabase
      .from("quizzes")
      .update({ number_of_answers: currentNumberOfAnswers + 1 })
      .eq("quiz_id", quizId);

    const { error: insertQuizzesError } = await supabase
      .from("quizzes")
      .upsert(
        [{ quiz_id: quizId, last_answered_at: new Date().toISOString() }],
        {
          onConflict: "quiz_id",
        }
      );

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
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}
