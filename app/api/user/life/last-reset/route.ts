import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    // get reset life countdown
    const { data } = await supabase
      .from("life")
      .select("last_reset_at")
      .eq("wallet", wallet as string);

    if (data && data.length > 0) {
      const lastResetAt = data[0].last_reset_at;
      return NextResponse.json(lastResetAt, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      await supabase.from("life").insert({ wallet: wallet as string, life: 3 });

      return NextResponse.json(new Date().toISOString(), {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(new Date().toISOString(), { status: 500 });
  }
}
