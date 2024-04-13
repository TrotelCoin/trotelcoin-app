import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  if (!wallet) {
    return NextResponse.json("Parameters not found", { status: 400 });
  }

  let life = 3;

  // if doesn't exist create a new record
  const { data: result, error } = await supabase
    .from("life")
    .select("life")
    .eq("wallet", wallet as Address);

  if (error) {
    console.error(error);
    return NextResponse.json(3, { status: 500 });
  }

  if (result.length > 0) {
    life = result[0].life;

    // if last_reset_at is more than 1 day old and life < 3, reset life
    if (life < 3) {
      const { error: updateError } = await supabase
        .from("life")
        .update({ life: 3 })
        .lte(
          "last_reset_at",
          new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        )
        .eq("wallet", wallet as Address);

      if (updateError) {
        console.error(updateError);
        return NextResponse.json(3, { status: 500 });
      }
    }
  } else {
    try {
      const { error: insertLearnerError } = await supabase
        .from("learners")
        .insert({
          wallet: wallet as Address,
          number_of_quizzes_answered: 0,
          number_of_quizzes_created: 0,
          total_rewards_pending: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertLearnerError) {
        console.error(insertLearnerError);
        return NextResponse.json(3, { status: 500 });
      }

      const { error } = await supabase.from("life").insert({ wallet, life });

      if (error) {
        console.error(error);
        return NextResponse.json(3, { status: 500 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(3, { status: 500 });
    }

    return NextResponse.json(3, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return NextResponse.json(result[0].life, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
