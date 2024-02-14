import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
      return new NextResponse(
        JSON.stringify({ error: "Something went wrong." }),
        { status: 500 }
      );
    }

    // get the position of the learner
    const position = leaderboard.findIndex(
      (learner) => learner.wallet === (wallet as string)
    );

    return new NextResponse(
      JSON.stringify({ leaderboard, position: position + 1 }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
