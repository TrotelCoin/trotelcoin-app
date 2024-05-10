import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* POST /api/learner
 * Adds a new learner to the database.
 * @param {string} wallet - The wallet address of the learner.
 * @returns {string} success - Indicates the result of the operation.
 * @security None
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    // check if the wallet exists in the database
    const { data: userExists } = await supabase
      .from("learners")
      .select("*")
      .eq("wallet", wallet);

    if (!userExists || userExists.length === 0) {
      // wallet does not exist in the database
      await supabase.from("learners").insert([
        {
          wallet: wallet,
          number_of_quizzes_answered: 0,
          number_of_quizzes_created: 0,
          total_rewards_pending: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      return NextResponse.json(
        { success: "New learner added." },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { success: "Learner already exists." },
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
