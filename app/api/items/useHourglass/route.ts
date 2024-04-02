import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json("No wallet", { status: 400 });
  }

  const { data: lostStreakData, error: lostStreakError } = await supabase
    .from("streak")
    .select("streak_lost_at")
    .eq("wallet", wallet);

  if (lostStreakError) {
    console.error(lostStreakError);
    return NextResponse.json(lostStreakError, { status: 500 });
  }

  if (lostStreakData.length > 0) {
    const date = new Date(lostStreakData[0].streak_lost_at);
    const now = new Date();

    const differenceInMs = now.getTime() - date.getTime();
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    if (differenceInDays > 3) {
      console.error("Hourglass can't be use");
      return NextResponse.json("Hourglass can't be use.", { status: 500 });
    }
  }

  const { data: maxStreak, error: getMaxStreakError } = await supabase
    .from("streak")
    .select("max_streak")
    .eq("wallet", wallet);

  if (getMaxStreakError) {
    console.error(getMaxStreakError);
    return NextResponse.json(getMaxStreakError, { status: 500 });
  }

  if (maxStreak.length > 0) {
    const { error } = await supabase
      .from("streak")
      .update({
        current_streak: maxStreak[0].max_streak,
      })
      .eq("wallet", wallet);

    if (error) {
      console.error(error);
      return NextResponse.json(error, { status: 500 });
    }
  } else {
    return NextResponse.json("Max streak not found", { status: 400 });
  }

  return NextResponse.json("Max streak restored", { status: 200 });
}
