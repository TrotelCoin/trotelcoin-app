import rateLimit from "@/utils/api/rateLimit";
import { supabase } from "@/utils/supabase/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
  shieldName: z.string(),
});

/* POST /api/user/items/use-shields
 * Activates a shield for the user.
 * @param {string} wallet - The wallet address of the user.
 * @param {string} shieldName - The name of the shield to activate.
 * @returns {string} message - Indicates the result of the operation.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
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

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const { wallet, shieldName } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
      shieldName: searchParams.get("shieldName"),
    }).data as unknown as { wallet: Address; shieldName: string };

    const { data: walletData } = await supabase
      .from("shields")
      .select("wallet")
      .eq("wallet", wallet)
      .eq("shield_name", shieldName);

    if (walletData && walletData.length === 0) {
      await supabase.from("shields").insert({
        wallet: wallet,
        shield_name: shieldName,
        start_time: new Date().toISOString(),
      });
    }

    if (!shieldName || shieldName.length === 0) {
      return NextResponse.json(`Shield ${shieldName} is not available`, {
        status: 404,
      });
    }

    await supabase
      .from("shields")
      .update({
        shield_name: shieldName,
        start_time: new Date().toISOString(),
      })
      .eq("wallet", wallet)
      .eq("shield_name", shieldName);

    return NextResponse.json(`Shield ${shieldName} has been activated`, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
