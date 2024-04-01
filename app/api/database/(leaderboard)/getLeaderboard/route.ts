import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // get leaderboard all of learners depending of total rewards
    const { data: leaderboard, error: leaderboardError } = await supabase
      .from("learners")
      .select("wallet, total_rewards_pending, number_of_quizzes_answered")
      .order("number_of_quizzes_answered", { ascending: false });

    if (leaderboardError) {
      console.error(leaderboardError);
      return NextResponse.json([], { status: 500 });
    }

    const filteredLeaderboard = leaderboard.filter(
      (learner) =>
        learner.wallet !== "undefined" &&
        learner.wallet !== null &&
        isAddress(learner.wallet)
    );

    const updatedLeaderboard = [];

    // for each learner, get their streak from streak table
    for (let i = 0; i < filteredLeaderboard.length; i++) {
      const { data: streak, error: streakError } = await supabase
        .from("streak")
        .select("current_streak")
        .eq("wallet", filteredLeaderboard[i].wallet)
        .limit(1);

      if (streakError) {
        console.error(streakError);
        return NextResponse.json([], { status: 500 });
      }

      const updatedLearner = { ...filteredLeaderboard[i], current_streak: 0 };

      if (streak.length > 0) {
        updatedLearner.current_streak = streak[0].current_streak;
      } else {
        updatedLearner.current_streak = 0;
      }

      updatedLeaderboard.push(updatedLearner);
    }

    return NextResponse.json(
      {
        updatedLeaderboard,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
