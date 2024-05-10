import { NextRequest, NextResponse } from "next/server";
import answers from "@/data/quizzes/quizAnswers";
import type { QuizAnswer } from "@/types/courses/quiz";
import { Lang } from "@/types/language/lang";

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

export interface Quiz {
  quizId: number;
  correctAnswers: {
    en: string[];
    fr: string[];
  };
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const quizId: number = Number(searchParams.get("quizId"));
  const lang: Lang = searchParams.get("lang") as Lang;

  const quiz: Quiz = answers.find((answer) => answer.quizId === quizId) as Quiz;

  const answersInLanguage = getAnswersByLanguage(quiz, lang as string);

  return NextResponse.json(answersInLanguage, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
