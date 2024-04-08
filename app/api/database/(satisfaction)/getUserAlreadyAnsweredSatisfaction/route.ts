import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  if (!wallet) {
    return NextResponse.json("Parameters not found", { status: 400 });
  }

  const { data, error } = await supabase
    .from("net_promoter_scores")
    .select("net_promoter_score")
    .eq("wallet", wallet as Address);

  if (error) {
    console.error(error);
    return NextResponse.json(false, { status: 500 });
  }

  if (data.length > 0) {
    return NextResponse.json(true, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } else {
    return NextResponse.json(false, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
