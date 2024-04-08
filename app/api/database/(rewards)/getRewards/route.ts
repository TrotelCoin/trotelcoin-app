import { supabase } from "@/lib/supabase/db";
import { calculateRewards } from "@/utils/calculateRewards";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const multipliers: number = 1;

  try {
    // get remaining rewards
    const { data: result, error: selectError } = await supabase
      .from("algorithm")
      .select("remaining_rewards");

    if (selectError) {
      console.error(selectError);
      return NextResponse.json(0, { status: 500 });
    }

    const remainingRewards = result[0]?.remaining_rewards;

    // reset rewards if 24h has passed
    const { error: updateError } = await supabase
      .from("algorithm")
      .upsert(
        [
          {
            remaining_rewards: remainingRewards,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "updated_at" }
      )
      .lte(
        "updated_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      );

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(0, { status: 500 });
    }

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
