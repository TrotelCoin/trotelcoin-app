import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data } = await supabase
      .from("quizzes_results")
      .select("marks")
      .eq("wallet", wallet);

    let average: number = 0;

    if (data && data.length > 0) {
      let sum: number = 0;

      data.forEach((mark) => {
        sum += mark.marks;
      });

      average = sum / data.length;
    }

    return NextResponse.json(average, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
