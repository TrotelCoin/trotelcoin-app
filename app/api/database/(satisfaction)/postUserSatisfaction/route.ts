import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const satisfaction = searchParams.get("number");
  const wallet = searchParams.get("wallet");

  try {
    const { error } = await supabase.from("net_promoter_scores").insert([
      {
        net_promoter_score: parseFloat(satisfaction as string),
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
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
