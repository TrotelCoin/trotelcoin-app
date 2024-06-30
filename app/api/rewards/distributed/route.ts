import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

/* GET /api/rewards/distributed
 * Returns the rewards distributed.
 * @returns {number} distributedAmount - The rewards distributed.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase.from("minted_rewards").select("amount");

    if (!data) {
      return NextResponse.json(0, { status: 404 });
    }

    const distributedAmount = data.reduce((acc, curr) => acc + curr.amount, 0);

    return NextResponse.json(distributedAmount, {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    return NextResponse.json(0, { status: 500 });
  }
}
