import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address, isAddress } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // get leaderboard all of learners depending of total rewards
    const { data: leaderboard, error: leaderboardError } = await supabase
      .from("learners")
      .select("wallet, number_of_quizzes_answered")
      .order("number_of_quizzes_answered", { ascending: false });

    if (leaderboardError) {
      console.error(leaderboardError);
      return NextResponse.json(leaderboardError, { status: 500 });
    }

    const { data: averageMarks, error: averageMarksError } = await supabase
      .from("quizzes_results")
      .select("wallet, marks");

    if (averageMarksError) {
      console.error(averageMarksError);
      return NextResponse.json(averageMarksError, { status: 500 });
    }

    const averageMarksMap: Record<
      Address,
      { totalMarks: number; count: number }
    > = {};
    averageMarks.forEach((result: { wallet: Address; marks: number }) => {
      if (!averageMarksMap[result.wallet]) {
        averageMarksMap[result.wallet] = { totalMarks: 0, count: 0 };
      }
      averageMarksMap[result.wallet].totalMarks += result.marks;
      averageMarksMap[result.wallet].count++;
    });

    const filteredLeaderboard = leaderboard.filter(
      (learner) =>
        learner.wallet !== "undefined" &&
        learner.wallet !== null &&
        isAddress(learner.wallet)
    );

    const updatedLeaderboard: {
      average_marks: number;
      wallet: Address;
      number_of_quizzes_answered: number;
    }[] = [];

    // calculate average mark for each learner
    filteredLeaderboard.forEach((element) => {
      const learnerMarks = averageMarksMap[element.wallet];
      const averageMarks =
        learnerMarks && learnerMarks.count > 0
          ? learnerMarks.totalMarks / learnerMarks.count
          : 0;
      const updatedLearner = {
        ...element,
        average_marks: averageMarks,
      };
      updatedLeaderboard.push(updatedLearner);
    });

    updatedLeaderboard.sort((a, b) => b.average_marks - a.average_marks);

    return NextResponse.json(
      {
        updatedLeaderboard,
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
