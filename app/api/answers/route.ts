import { NextRequest, NextResponse } from "next/server";
import answers from "@/data/quizzes/quizAnswers";

const getAnswersByLanguage = (quiz: any, lang: string) => {
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

  const quizId = searchParams.get("quizId");
  const lang = searchParams.get("lang");

  const quiz = answers.find(
    (answer) => answer.quizId === parseFloat(quizId as string)
  );

  if (!quiz) {
    return NextResponse.json({ result: "Answers not found" }, { status: 404 });
  }

  const answersInLanguage = getAnswersByLanguage(quiz, lang as string);

  if (!answersInLanguage) {
    return NextResponse.json({ result: "Language not found" }, { status: 404 });
  }

  return NextResponse.json(answersInLanguage, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
