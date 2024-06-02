import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import rateLimit from "@/utils/api/rateLimit";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
});

/* GET /api/user/rewards
 * Returns the pending rewards of a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {number} pending_rewards - The pending rewards of the user.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  if (await rateLimit(req, res)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
    }).data as unknown as { wallet: Address };

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
