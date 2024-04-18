import { NextRequest, NextResponse } from "next/server";
import answers from "@/data/quizzes/quizAnswers";
import type { QuizAnswer } from "@/types/courses/quiz";
import { Lang } from "@/types/lang";

export const dynamic = "force-dynamic";

const getAnswersByLanguage = (quiz: QuizAnswer, lang: string) => {
  switch (lang) {
    case "en":
      return quiz.correctAnswers.en;
    case "fr":
      return quiz.correctAnswers.fr;
    default:
      return quiz.correctAnswers.en;
  }
};

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const quizId: number = Number(searchParams.get("quizId"));
  const lang: Lang = searchParams.get("lang") as Lang;

  const quiz = answers.find((answer) => answer.quizId === quizId);

  const answersInLanguage = getAnswersByLanguage(quiz, lang as string);

  return NextResponse.json(answersInLanguage, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
