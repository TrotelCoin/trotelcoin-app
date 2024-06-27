import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { isAuthenticated } from "@/utils/auth/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>()
});

/* POST /api/user/rewards/reset
 * Resets the pending rewards of a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {boolean} success - Whether the rewards were reset successfully.
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
