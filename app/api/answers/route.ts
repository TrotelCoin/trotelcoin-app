import { NextRequest, NextResponse } from "next/server";
import answers from "@/data/quizzes/quizAnswers";
import type { QuizAnswer } from "@/types/courses/quiz";
import { Lang } from "@/types/language/lang";
import { getAnswersByLanguage } from "@/utils/quizzes/getAnswersByLanguage";

export const dynamic = "force-dynamic";

/* GET /api/answers?quizId=1&lang=en
 * Returns the correct answers for a quiz in a specific language.
 * @param {number} quizId - The ID of the quiz.
 * @param {string} lang - The language of the answers.
 * @returns {string[]} correctAnswers - The correct answers for the quiz in the specified language.
 * @security None
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const quizId: number = Number(searchParams.get("quizId"));
  const lang: Lang = searchParams.get("lang") as Lang;

  const quiz: QuizAnswer = answers.find(
    (answer) => answer.quizId === quizId
  ) as QuizAnswer;

  const answersInLanguage = getAnswersByLanguage(quiz, lang as string);

  return NextResponse.json(answersInLanguage, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
