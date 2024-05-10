import { supabase } from "@/utils/supabase/db";
import remainingRewards from "@/data/rewards/remainingRewards";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Reset rewards if 24h has passed
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

    const { data: result } = await supabase
      .from("algorithm")
      .select("remaining_rewards");

    if (result && result[0] && "remaining_rewards" in result[0]) {
      return NextResponse.json(result[0].remaining_rewards, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json(0, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
