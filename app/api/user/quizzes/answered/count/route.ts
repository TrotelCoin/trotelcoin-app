import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* GET /api/user/multipliers
 * Returns the multipliers of a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {boolean} multipliersEnabled - The multipliers enabled.
 * @returns {number} timeLeft - The time left for the multipliers.
 * @returns {number} multipliers - The multipliers of the user.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data: result } = await supabase
      .from("learners")
      .select("number_of_quizzes_answered")
      .eq("wallet", wallet);

    if (result && result.length > 0) {
      return NextResponse.json(result[0].number_of_quizzes_answered, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json(0, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
