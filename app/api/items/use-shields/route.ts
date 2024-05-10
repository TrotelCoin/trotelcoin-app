import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* POST /api/items/use-shields
 * Activates a shield for the user.
 * @param {string} wallet - The wallet address of the user.
 * @param {string} shieldName - The name of the shield to activate.
 * @returns {string} message - Indicates the result of the operation.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;
  const shieldName = searchParams.get("shieldName");

  try {
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
    return NextResponse.json(null, { status: 500 });
  }
}
