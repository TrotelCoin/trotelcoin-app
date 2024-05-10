import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* GET /api/streak/max-streak
 * Returns the maximum streak.
 * @returns {number} max_streak - The maximum streak.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data: result } = await supabase
      .from("streak")
      .select("max_streak")
      .eq("wallet", wallet);

    if (result && result.length > 0) {
      return NextResponse.json(result[0].max_streak);
    } else {
      return NextResponse.json(0, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
