import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* POST /api/user/satisfaction
 * Records the satisfaction of a user.
 * @param {number} number - The satisfaction of the user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {object} success - The success message.
 * @security None
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const satisfaction: number = Number(searchParams.get("number"));
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    await supabase.from("net_promoter_scores").insert([
      {
        net_promoter_score: satisfaction,
        answered_at: new Date().toISOString(),
        wallet: wallet,
      },
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
