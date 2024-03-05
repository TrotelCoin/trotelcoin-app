import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  try {
    const { data: result, error } = await supabase
      .from("streak")
      .select("max_streak")
      .eq("wallet", wallet as Address);

    if (error) {
      console.error(error);
      return NextResponse.json(0, { status: 500 });
    }

    if (result.length > 0) {
      return NextResponse.json(result[0].max_streak);
    } else {
      return NextResponse.json(0, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
