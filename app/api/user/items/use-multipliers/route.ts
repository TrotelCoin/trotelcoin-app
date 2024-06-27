import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";
import { isAuthenticated } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
  multipliersName: z.string()
});

/* POST /api/user/items/use-multipliers
 * Activates multipliers for the user.
 * @param {string} wallet - The wallet address of the user.
 * @param {string} multipliersName - The name of the multipliers to activate.
 * @returns {string} message - Indicates the result of the operation.
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
    const { wallet, multipliersName } = inputSchema.safeParse({
      wallet: body.wallet,
      multipliersName: body.multipliersName
    }).data as unknown as { wallet: Address; multipliersName: string };

    let multipliers: number = 1;

    switch (multipliersName) {
      case "x2":
        multipliers = 2;
        break;
      case "x5":
        multipliers = 5;
        break;
      case "x10":
        multipliers = 10;
        break;
      case "x25":
        multipliers = 25;
        break;
      default:
        break;
    }

    const { data: walletData } = await supabase
      .from("multipliers")
      .select("wallet")
      .eq("wallet", wallet)
      .eq("multipliers", multipliers);

    if (walletData && walletData.length === 0) {
      await supabase.from("multipliers").insert({
        wallet: wallet,
        multipliers: multipliers,
        start_time: new Date().toISOString()
      });
    }

    await supabase
      .from("multipliers")
      .update({
        multipliers: multipliers,
        start_time: new Date().toISOString()
      })
      .eq("wallet", wallet)
      .eq("multipliers", multipliers);

    return NextResponse.json(`Multipliers x${multipliers} has been activated`, {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
