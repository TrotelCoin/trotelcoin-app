import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const quizId: number = Number(searchParams.get("quizId"));
  const numberOfWrongAnswers: number = Number(
    searchParams.get("numberOfWrongAnswers")
  );
  const totalQuestions: number = Number(searchParams.get("totalQuestions"));
  const wallet: Address = searchParams.get("wallet") as Address;

  const { data, error: existsError } = await supabase
    .from("quizzes_results")
    .select("marks")
    .eq("quiz_id", quizId)
    .eq("wallet", wallet);

  if (existsError) {
    console.error(existsError);
    return NextResponse.json(existsError, { status: 500 });
  }

  if (data.length > 0) {
    return NextResponse.json("Already exists", {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const numberOfGoodAnswers = Math.max(
    0,
    Number(totalQuestions) - Number(numberOfWrongAnswers)
  );

  const { error } = await supabase.from("quizzes_results").insert({
    quiz_id: Number(quizId),
    wallet: wallet,
    number_of_wrong_answers: Number(numberOfWrongAnswers),
    total_questions: Number(totalQuestions),
    answered_at: new Date().toISOString(),
    marks: (Number(numberOfGoodAnswers) / Number(totalQuestions)) * 20,
  });

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json("Results submitted", {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
