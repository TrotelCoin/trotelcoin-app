import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Address, isAddress } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");

    // get leaderboard all of learners depending of total rewards
    const { data: leaderboard, error: leaderboardError } = await supabase
      .from("learners")
      .select("wallet, total_rewards_pending, number_of_quizzes_answered")
      .order("number_of_quizzes_answered", { ascending: false });

    if (leaderboardError) {
      console.error(leaderboardError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    const { data: streak, error: streakError } = await supabase
      .from("streak")
      .select("current_streak")
      .eq("wallet", wallet as Address)
      .limit(1);

    if (streakError) {
      console.error(streakError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    let position: number = 0;
    let numberOfQuizzesAnswered: number = 0;

    const filteredLeaderboard = leaderboard.filter(
      (learner) =>
        learner.wallet !== "undefined" &&
        learner.wallet !== null &&
        isAddress(learner.wallet)
    );

    // get the position of the learner
    position = filteredLeaderboard.findIndex(
      (learner) => learner.wallet === (wallet as Address)
    );

    if (position !== 0) {
      numberOfQuizzesAnswered =
        filteredLeaderboard[position].number_of_quizzes_answered;
    }

    return NextResponse.json(
      {
        position: position + 1,
        numberOfQuizzesAnswered: numberOfQuizzesAnswered,
        streak: streak.length > 0 ? streak[0].current_streak : 0,
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
