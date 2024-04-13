import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error } = await supabase
    .from("learners")
    .select("number_of_quizzes_answered");

  if (error) {
    return NextResponse.json(0, { status: 500 });
  } else {
    const result: number = data.reduce(
      (acc, curr) => acc + curr.number_of_quizzes_answered,
      0
    );

    return NextResponse.json(result, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
