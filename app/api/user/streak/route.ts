import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/* GET /api/user/streak
 * Returns the user's current streak.
 * @param {string} wallet - The wallet address of the user.
 * @returns {number} currentStreak - The user's current streak.
 * @returns {string} lastUpdated - The date of the last streak.
 * @returns {boolean} disabled - Whether the user can update the streak.
 * @returns {boolean} lostStreak - Whether the user lost the streak.
 * @security None
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  let lostStreak: boolean = false;

  try {
    // get streak information for the specified wallet
    const { data: result } = await supabase
      .from("streak")
      .select("*")
      .eq("wallet", wallet);

    if (!result) {
      return NextResponse.json(
        {
          currentStreak: 0,
          lastUpdated: new Date().toISOString(),
          disabled: false,
          lostStreak: false,
        },
        { status: 404 }
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

    await supabase
      .from("streak")
      .update({ current_streak: 0, streak_lost_at: new Date().toISOString() })
      .lte("last_streak_at", twoDaysAgo.toISOString())
      .eq("wallet", wallet);

    // check if one day hasn't passed since the last streak
    if (lastUpdated) {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      oneDayAgo.setHours(0, 0, 0, 0);

      const { data: oneDay } = await supabase
        .from("streak")
        .select("*")
        .lte("last_streak_at", oneDayAgo.toISOString())
        .eq("wallet", wallet);

      if (oneDay && oneDay.length === 0) {
        disabled = true;
      }
    }

    if (lostStreakAt && lostStreakAt >= twoDaysAgo.toISOString()) {
      lostStreak = true;
    }

    if (lastUpdated) {
      const date = new Date(lastUpdated);
      date.setHours(0, 0, 0, 0);
      lastUpdated = date.toISOString();
    }

    return NextResponse.json(
      { currentStreak, lastUpdated, disabled, lostStreakAt, lostStreak },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        currentStreak: 0,
        lastUpdated: new Date().toISOString(),
        disabled: false,
        lostStreak: false,
      },
      { status: 500 }
    );
  }
}

/* POST /api/user/streak
 * Updates the user's streak.
 * @param {string} wallet - The wallet address of the user.
 * @returns {string} success - Indicates the result of the operation.
 * @security None
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    // Check if wallet exists in "learners" table
    const { data: walletExists } = await supabase
      .from("learners")
      .select("*")
      .eq("wallet", wallet as string);

    if (walletExists && walletExists.length === 0) {
      // wallet does not exist in the "learners" table
      await supabase.from("learners").insert([
        {
          wallet: wallet as string,
          number_of_quizzes_answered: 0,
          number_of_quizzes_created: 0,
          total_rewards_pending: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }

    // Check if wallet exists in "streak" table
    const { data: streakExists } = await supabase
      .from("streak")
      .select("*")
      .eq("wallet", wallet as string);

    if (streakExists && streakExists.length === 0) {
      // create a new streak if the wallet does not exist
      await supabase.from("streak").insert([
        {
          wallet: wallet as string,
          current_streak: 1,
          max_streak: 1,
          last_streak_at: new Date().toISOString(),
        },
      ]);

      return NextResponse.json(
        { success: "Streak updated" },
        {
          status: 200,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    // check if one day has passed since the last streak
    const { data: oneDay } = await supabase
      .from("streak")
      .select("*")
      .eq("wallet", wallet as string)
      .lte(
        "last_streak_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      );

    // get the current streak
    const { data: currentStreak } = await supabase
      .from("streak")
      .select("current_streak")
      .eq("wallet", wallet as string);

    // update only if the last streak was more than 1 day ago
    if (oneDay && oneDay.length > 0) {
      const nowMidnight = new Date();
      nowMidnight.setHours(0, 0, 0, 0);

      if (!currentStreak || currentStreak.length === 0) {
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }

      await supabase
        .from("streak")
        .update({
          current_streak: currentStreak[0].current_streak + 1,
          last_streak_at: nowMidnight.toISOString(),
        })
        .eq("wallet", wallet as string);

      // get max streak
      const { data: maxStreak } = await supabase
        .from("streak")
        .select("max_streak")
        .eq("wallet", wallet as string);

      if (!maxStreak || maxStreak.length === 0) {
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }

      // update max streak
      await supabase
        .from("streak")
        .update({
          max_streak: Math.max(
            maxStreak[0].max_streak,
            currentStreak[0].current_streak + 1
          ),
        })
        .eq("wallet", wallet as string);

      return NextResponse.json(
        { success: "Streak updated." },
        {
          status: 200,
          headers: { "Cache-Control": "no-store" },
        }
      );
    } else {
      return NextResponse.json(
        { success: "Streak not updated." },
        {
          status: 200,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
