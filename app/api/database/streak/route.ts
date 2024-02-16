import { supabase } from "@/lib/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    // update streaks where last_streak_at is more than 2 days old
    const { error: updateError } = await supabase
      .from("streak")
      .update({ current_streak: 0 })
      .lte(
        "last_streak_at",
        new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      )
      .eq("wallet", wallet as Address);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    // get streak information for the specified wallet
    const { data: result, error } = await supabase
      .from("streak")
      .select("*")
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    const currentStreak = result[0]?.current_streak;
    let lastUpdated = result[0]?.last_streak_at;
    let disabled = false;

    // check if one day hasn't passed since the last streak
    if (lastUpdated) {
      const { data: oneDay, error: oneDayError } = await supabase
        .from("streak")
        .select("*")
        .lte(
          "last_streak_at",
          new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        )
        .eq("wallet", wallet as Address);

      if (oneDayError) {
        console.error(oneDayError);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }

      if (!oneDay.length) {
        disabled = true;
      }
    }

    if (lastUpdated) {
      const date = new Date(lastUpdated).toISOString();
      lastUpdated = date;
    }

    return NextResponse.json(
      { currentStreak, lastUpdated, disabled },
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
