import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase.from("quizzes_results").select("marks");

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
