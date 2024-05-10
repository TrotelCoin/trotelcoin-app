import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/* GET /api/user/life
 * Returns the life of a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {number} life - The life of the user.
 * @security None
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  let life = 3;

  try {
    // if doesn't exist create a new record
    const { data: result } = await supabase
      .from("life")
      .select("life")
      .eq("wallet", wallet);

    if (result && result.length > 0) {
      life = result[0].life;

      // if last_reset_at is more than 1 day old and life < 3, reset life
      if (life < 3) {
        await supabase
          .from("life")
          .update({ life: 3 })
          .lte(
            "last_reset_at",
            new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          )
          .eq("wallet", wallet);
      }
    } else {
      await supabase.from("learners").insert({
        wallet: wallet,
        number_of_quizzes_answered: 0,
        number_of_quizzes_created: 0,
        total_rewards_pending: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      await supabase.from("life").insert({ wallet, life });

      return NextResponse.json(3, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.json(result[0].life, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(3, { status: 500 });
  }
}

/* POST /api/user/life
 * Updates the life of a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {number} life - The life of the user.
 * @security None
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    // if doesn't exist create a new record
    const { data: result } = await supabase
      .from("life")
      .select("life")
      .eq("wallet", wallet);

    if (!result || result.length === 0) {
      await supabase.from("life").insert([
        {
          wallet: wallet,
          life: 2,
          last_reset_at: new Date().toISOString(),
        },
      ]);

      return NextResponse.json(2, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }

    // remove 1 life from the user
    await supabase
      .from("life")
      .update({
        life: result[0].life - 1,
        last_reset_at: new Date().toISOString(),
      })
      .eq("wallet", wallet);

    return NextResponse.json(result[0].life - 1, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
