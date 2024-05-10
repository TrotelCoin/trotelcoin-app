import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* GET /api/user/satisfaction/status
 * Returns the status of the user's satisfaction.
 * @param {string} wallet - The wallet address of the user.
 * @returns {boolean} status - The status of the user's satisfaction.
 * @security None
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data } = await supabase
      .from("net_promoter_scores")
      .select("net_promoter_score")
      .eq("wallet", wallet);

    if (data && data.length > 0) {
      return NextResponse.json(true, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json(false, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(false, { status: 500 });
  }
}
