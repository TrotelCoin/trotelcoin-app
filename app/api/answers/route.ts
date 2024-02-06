import { NextRequest, NextResponse } from "next/server";
import answers from "@/data/quizAnswers";

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
    return new NextResponse("Answers not found", { status: 404 });
  }

  const answersInLanguage = getAnswersByLanguage(quiz, lang as string);

  if (!answersInLanguage) {
    return new NextResponse("Language not found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(answersInLanguage), { status: 200 });
}
