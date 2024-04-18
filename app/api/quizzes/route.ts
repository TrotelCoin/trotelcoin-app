import quizzes from "@/data/quizzes/quizData";
import { NextRequest, NextResponse } from "next/server";
import { getQuestionsByLanguage } from "@/lib/quizzes/quizzes";
import { Lang } from "@/types/lang";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const quizId: number = Number(searchParams.get("quizId"));
  const lang: Lang = searchParams.get("lang") as Lang;

  const quiz = quizzes.find((quiz) => quiz.quizId === quizId);

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  const questionsInLanguage = getQuestionsByLanguage(quiz, lang);

  if (!questionsInLanguage) {
    return NextResponse.json({ error: "Language not found" }, { status: 404 });
  }

  return NextResponse.json(questionsInLanguage, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
