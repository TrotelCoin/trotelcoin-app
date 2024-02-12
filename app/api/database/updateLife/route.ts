import { supabase } from "@/lib/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    // if doesn't exist create a new record
    const { data: result, error } = await supabase
      .from("life")
      .select("life")
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return new NextResponse("Something went wrong.", { status: 500 });
    }

    if (result.length === 0) {
      const { error: insertError } = await supabase.from("life").insert([
        {
          wallet: wallet as Address,
          life: 2,
          last_reset_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error(insertError);
        return new NextResponse("Something went wrong.", { status: 500 });
      }

      return new NextResponse(JSON.stringify(2), { status: 200 });
    }

    // remove 1 life from the user
    const { error: updateError } = await supabase
      .from("life")
      .update({ life: result[0].life - 1 })
      .eq("wallet", wallet as Address);

    if (updateError) {
      console.error(updateError);
      return new NextResponse("Something went wrong.", { status: 500 });
    }

    return new NextResponse(JSON.stringify(result[0].life - 1), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong.", { status: 500 });
  }
}
