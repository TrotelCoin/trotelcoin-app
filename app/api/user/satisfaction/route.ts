import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";
import { isUserAuthenticated } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
  satisfaction: z.number().min(0).max(10)
});

/* POST /api/user/satisfaction
 * Records the satisfaction of a user.
 * @param {number} number - The satisfaction of the user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {object} success - The success message.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  if (!isUserAuthenticated(req)) {
    return NextResponse.json(
      { error: "You are not authenticated." },
      { status: 401 }
    );
  }

  try {
    const { wallet, satisfaction } = inputSchema.safeParse({
      wallet: body.wallet,
      satisfaction: body.satisfaction
    }).data as unknown as { wallet: Address; satisfaction: number };

    await supabase.from("net_promoter_scores").insert([
      {
        net_promoter_score: satisfaction,
        answered_at: new Date().toISOString(),
        wallet: wallet
      }
    ]);

    return NextResponse.json(
      { success: "Satisfaction recorded." },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
