import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";
import { z } from "zod";
import { isAuthenticated } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>()
});

/* POST /api/user/items/use-clock
 * Restores the user's max streak.
 * @param {string} wallet - The wallet address of the user.
 * @returns {string} message - Indicates the result of the operation.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  if (!isAuthenticated(req)) {
    return NextResponse.json(
      { error: "You are not authenticated." },
      { status: 401 }
    );
  }

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: body.wallet
    }).data as unknown as { wallet: Address };

    const { data: lostStreakData } = await supabase
      .from("streak")
      .select("streak_lost_at")
      .eq("wallet", wallet);

    if (lostStreakData && lostStreakData.length > 0) {
      const date = new Date(lostStreakData[0].streak_lost_at);
      const now = new Date();

      const differenceInMs = now.getTime() - date.getTime();
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

      if (differenceInDays > 3) {
        console.error("Hourglass can't be use");
        return NextResponse.json("Hourglass can't be use", { status: 500 });
      }
    }

    const { data: maxStreak } = await supabase
      .from("streak")
      .select("max_streak")
      .eq("wallet", wallet);

    if (maxStreak && maxStreak.length > 0) {
      await supabase
        .from("streak")
        .update({
          current_streak: maxStreak[0].max_streak,
          last_streak_at: new Date().toISOString()
        })
        .eq("wallet", wallet);
    } else {
      return NextResponse.json("Max streak not found", { status: 404 });
    }

    return NextResponse.json("Max streak restored", {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
