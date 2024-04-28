import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data: maxStreak } = await supabase
      .from("streak")
      .select("max_streak")
      .eq("wallet", wallet);

    if (maxStreak && maxStreak.length > 0) {
      await supabase
        .from("streak")
        .update({
          current_streak: maxStreak[0].max_streak,
          last_streak_at: new Date().toISOString(),
        })
        .eq("wallet", wallet);
    } else {
      return NextResponse.json("Max streak not found", { status: 404 });
    }

    return NextResponse.json("Max streak restored", {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
