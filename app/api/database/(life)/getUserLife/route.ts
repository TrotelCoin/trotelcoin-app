import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
