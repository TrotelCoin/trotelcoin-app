import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

/* GET /api/rewards/distibuted/this-week
 * Returns the total rewards distributed this week.
 * @returns {number} distributedAmount - The rewards distributed this week.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase
      .from("minted_rewards")
      .select("amount, minted_at");

    if (!data) {
      return NextResponse.json(0, { status: 404 });
    }

    const distributedAmount = data.reduce((acc, curr) => {
      const mintedAt = new Date(curr.minted_at);
      const now = new Date();
      const diff = now.getTime() - mintedAt.getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return diffDays <= 7 ? acc + curr.amount : acc;
    }, 0);

    return NextResponse.json(distributedAmount, {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    return NextResponse.json(0, { status: 500 });
  }
}
