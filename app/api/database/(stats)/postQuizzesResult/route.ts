import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/db";
import { Address } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get("quizId");
  const numberOfWrongAnswers = searchParams.get("numberOfWrongAnswers");
  const totalQuestions = searchParams.get("totalQuestions");
  const wallet = searchParams.get("wallet");

  const numberOfGoodAnswers =
    Number(totalQuestions) - Number(numberOfWrongAnswers);

  const { error } = await supabase.from("quizzes_results").insert({
    quiz_id: Number(quizId),
    wallet: wallet as Address,
    number_of_wrong_answers: Number(numberOfWrongAnswers),
    total_questions: Number(totalQuestions),
    answered_at: new Date().toISOString(),
    marks: (Number(numberOfGoodAnswers) / Number(totalQuestions)) * 20,
  });

  if (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json("Results submitted", { status: 200 });
}
