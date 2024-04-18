import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  // get reset life countdown
  const response = await supabase
    .from("life")
    .select("last_reset_at")
    .eq("wallet", wallet as string);

  if (response.error) {
    console.error(response.error);
    return NextResponse.json(new Date().toISOString(), { status: 500 });
  }

  if (response.data.length > 0) {
    const lastResetAt = response.data[0].last_reset_at;
    return NextResponse.json(lastResetAt, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } else {
    try {
      await supabase.from("life").insert({ wallet: wallet as string, life: 3 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(new Date().toISOString(), { status: 500 });
    }

    return NextResponse.json(new Date().toISOString(), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
