import { supabase } from "@/lib/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const quizId: number = Number(searchParams.get("quizId"));

    if (!quizId) {
      return NextResponse.json("Parameters not found", { status: 400 });
    }

    const { data, error } = await supabase
      .from("quizzes")
      .select("number_of_answers")
      .eq("quiz_id", quizId);

    if (error) {
      console.error(error);
      return NextResponse.json({ answered: false }, { status: 500 });
    }

    if (data.length > 0) {
      return NextResponse.json(data[0].number_of_answers, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
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
