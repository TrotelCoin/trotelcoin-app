import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

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
