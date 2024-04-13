import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const satisfaction: number = Number(searchParams.get("number"));
  const wallet: Address = searchParams.get("wallet") as Address;

  if (!wallet) {
    return NextResponse.json("Parameters not found", { status: 400 });
  }

  const { error } = await supabase.from("net_promoter_scores").insert([
    {
      net_promoter_score: satisfaction,
      answered_at: new Date().toISOString(),
      wallet: wallet as Address,
    },
  ]);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: "Satisfaction recorded." },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
