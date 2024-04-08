import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  const { data, error } = await supabase
    .from("quizzes_results")
    .select("marks")
    .eq("wallet", wallet as Address);

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  let average: number = 0;

  if (data.length > 0) {
    let sum: number = 0;

    data.forEach((mark) => {
      sum += mark.marks;
    });

    average = sum / data.length;
  }

  return NextResponse.json(average, { status: 200 });
}
