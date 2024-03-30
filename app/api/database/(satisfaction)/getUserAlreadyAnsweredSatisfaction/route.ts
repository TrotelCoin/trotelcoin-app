import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    const { data, error } = await supabase
      .from("net_promoter_scores")
      .select("net_promoter_score")
      .eq("wallet", wallet as Address)
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(false, { status: 500 });
    }

    if (data) {
      return NextResponse.json(true, { status: 200 });
    } else {
      return NextResponse.json(false, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(false, { status: 500 });
  }
}
