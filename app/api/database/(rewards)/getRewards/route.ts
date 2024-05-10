import { supabase } from "@/utils/supabase/db";
import { calculateRewards } from "@/utils/calculateRewards";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const multipliers: number = 1;

  try {
    // get remaining rewards
    const { data: result } = await supabase
      .from("algorithm")
      .select("remaining_rewards");

    if (!result) {
      return NextResponse.json(0, { status: 404 });
    }

    const remainingRewards = result[0]?.remaining_rewards;

    // reset rewards if 24h has passed
    await supabase
      .from("algorithm")
      .update({
        remaining_rewards: remainingRewards,
        updated_at: new Date().toISOString(),
      })
      .lte(
        "updated_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      );

    // calculate rewards
    const calculatedRewards = calculateRewards(remainingRewards, multipliers);

    return NextResponse.json(calculatedRewards, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
