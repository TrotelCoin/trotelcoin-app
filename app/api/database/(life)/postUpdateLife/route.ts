import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
