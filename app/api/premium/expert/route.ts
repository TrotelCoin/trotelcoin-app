import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
});

/* POST /api/premium/expert
 * Claims the expert subscription.
 * @param {string} wallet - The wallet address of the user.
 * @returns {string} claimed - Indicates the result of the operation.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
    }).data as unknown as { wallet: Address };

    const { data } = await supabase
      .from("subscriptions")
      .select("wallet")
      .eq("wallet", wallet);

    if (data && data.length > 0) {
      return NextResponse.json(
        { claimed: "You have already claimed this." },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    } else {
      const { data } = await supabase.from("subscriptions").upsert([
        {
          wallet: wallet,
          claimed_expert_at: new Date().toISOString(),
        },
      ]);

      if (data) {
        return NextResponse.json(
          { claimed: "Claimed successfully." },
          { status: 200, headers: { "Cache-Control": "no-store" } }
        );
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
