import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  let life = 3;

  try {
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
        const { error } = await supabase.from("life").insert({ wallet, life });

        if (error) {
          console.error(error);
          return NextResponse.json(3, { status: 500 });
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json(3, { status: 500 });
      }

      return NextResponse.json(3, { status: 200 });
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
