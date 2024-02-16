import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error } = await supabase
    .from("learners")
    .select("number_of_quizzes_answered");

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  } else {
    const result: number = data.reduce(
      (acc, curr) => acc + curr.number_of_quizzes_answered,
      0
    );

    return NextResponse.json(result, {
      status: 200,
    });
  }
}
