import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* POST /api/user/rewards/reset
 * Resets the pending rewards of a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {boolean} success - Whether the rewards were reset successfully.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    await supabase
      .from("learners")
      .update({ total_rewards_pending: 0 })
      .eq("wallet", wallet);
    return NextResponse.json(
      { success: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
