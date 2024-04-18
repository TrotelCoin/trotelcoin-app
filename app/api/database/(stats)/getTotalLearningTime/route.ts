import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error } = await supabase
    .from("quizzes_times")
    .select("diffTime");

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  let time: number = 0; // in ms

  if (data.length > 0) {
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
}
