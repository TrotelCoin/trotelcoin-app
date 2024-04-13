import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error } = await supabase
    .from("quizzes_results")
    .select("marks");

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

  return NextResponse.json(average, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
