import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    // get streak information for the specified wallet
    const { data: result, error } = await supabase
      .from("streak")
      .select("*")
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return NextResponse.json(
        {
          currentStreak: 0,
          lastUpdated: new Date().toISOString(),
          disabled: false,
        },
        { status: 500 }
      );
    }

    const currentStreak = result[0]?.current_streak;
    const lostStreakAt = result[0]?.streak_lost_at;
    let lastUpdated = result[0]?.last_streak_at;
    let disabled = false;

    // update streaks where last_streak_at is more than 2 days old
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    twoDaysAgo.setHours(0, 0, 0, 0);

    const { error: updateError } = await supabase
      .from("streak")
      .update({ current_streak: 0, streak_lost_at: new Date().toISOString() })
      .lte("last_streak_at", twoDaysAgo.toISOString())
      .eq("wallet", wallet as Address);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        {
          currentStreak: 0,
          lastUpdated: new Date().toISOString(),
          disabled: false,
        },
        { status: 500 }
      );
    }

    // check if one day hasn't passed since the last streak
    if (lastUpdated) {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      oneDayAgo.setHours(0, 0, 0, 0);

      const { data: oneDay, error: oneDayError } = await supabase
        .from("streak")
        .select("*")
        .lte("last_streak_at", oneDayAgo.toISOString())
        .eq("wallet", wallet as Address);

      if (oneDayError) {
        console.error(oneDayError);
        return NextResponse.json(
          {
            currentStreak: 0,
            lastUpdated: oneDayAgo.toISOString(),
            disabled: false,
          },
          { status: 500 }
        );
      }

      if (oneDay.length === 0) {
        disabled = true;
      }
    }

    if (lastUpdated) {
      const date = new Date(lastUpdated);
      date.setHours(0, 0, 0, 0);
      lastUpdated = date.toISOString();
    }

    return NextResponse.json(
      { currentStreak, lastUpdated, disabled, lostStreakAt },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        currentStreak: 0,
        lastUpdated: new Date().toISOString(),
        disabled: false,
      },
      { status: 500 }
    );
  }
}
