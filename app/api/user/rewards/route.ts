import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/* GET /api/user/rewards/pending-rewards
 * Returns the pending rewards of a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {number} pending_rewards - The pending rewards of the user.
 * @security None
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data: result } = await supabase
      .from("learners")
      .select("total_rewards_pending")
      .eq("wallet", wallet);

    if (result && result[0] && "total_rewards_pending" in result[0]) {
      return NextResponse.json(result[0].total_rewards_pending, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json(0, {
        status: 404,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
