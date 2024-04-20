import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data, error } = await supabase
      .from("quizzes_times")
      .select("diffTime");

    let time: number = 0; // in ms

    if (data && data.length > 0) {
      data.forEach((diffTime) => {
        time += diffTime.diffTime;
      });
    } else {
      return NextResponse.json(time, { status: 404 });
    }

    return NextResponse.json(time, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
