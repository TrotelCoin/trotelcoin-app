import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // get leaderboard all of learners depending of total rewards
    const { data: leaderboard, error: leaderboardError } = await supabase
      .from("learners")
      .select("wallet, total_rewards_pending, number_of_quizzes_answered")
      .order("number_of_quizzes_answered", { ascending: false })
      .limit(20);

    if (leaderboardError) {
      console.error(leaderboardError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    const filteredLeaderboard = leaderboard.filter(
      (learner) =>
        learner.wallet !== "undefined" &&
        learner.wallet !== null &&
        learner.wallet !== ""
    );

    return NextResponse.json(
      {
        filteredLeaderboard,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
