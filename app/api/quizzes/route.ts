import quizzes from "@/data/quizzes/quizData";
import { NextRequest, NextResponse } from "next/server";

const getQuestionsByLanguage = (quiz: any, lang: string) => {
  switch (lang) {
    case "en":
      return quiz.questions.map((q: any) => ({
        questionId: q.questionId,
        question: q.question.en,
        options: q.options.en,
      }));
    case "fr":
      return quiz.questions.map((q: any) => ({
        questionId: q.questionId,
        question: q.question.fr,
        options: q.options.fr,
      }));
    default:
      return quiz.questions.map((q: any) => ({
        questionId: q.questionId,
        question: q.question.en,
        options: q.options.en,
      }));
  }
};

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const quizId = searchParams.get("quizId");
  const lang = searchParams.get("lang");

  const quiz = quizzes.find(
    (quiz) => quiz.quizId === parseFloat(quizId as string)
  );

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  const questionsInLanguage = getQuestionsByLanguage(quiz, lang as string);

  if (!questionsInLanguage) {
    return NextResponse.json({ error: "Language not found" }, { status: 404 });
  }

  return NextResponse.json(questionsInLanguage, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
