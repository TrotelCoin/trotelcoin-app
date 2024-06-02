import { NextRequest, NextResponse } from "next/server";
import answers from "@/data/quizzes/quizAnswers";
import type { QuizAnswer } from "@/types/courses/quiz";
import type { Lang } from "@/types/language/lang";
import { getAnswersByLanguage } from "@/utils/quizzes/getAnswersByLanguage";
import { z } from "zod";

export const dynamic = "force-dynamic";

// input schema
const inputSchema = z.object({
  quizId: z.number(),
  lang: z.custom<Lang>(),
});

/* GET /api/answers?quizId=1&lang=en
 * Returns the correct answers for a quiz in a specific language.
 * @param {number} quizId - The ID of the quiz.
 * @param {string} lang - The language of the answers.
 * @returns {string[]} correctAnswers - The correct answers for the quiz in the specified language.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  try {
    const { data } = inputSchema.safeParse({
      quizId: Number(searchParams.get("quizId")),
      lang: searchParams.get("lang"),
    });

    const { quizId, lang } = data as { quizId: number; lang: Lang };

    const quiz: QuizAnswer = answers.find(
      (answer) => answer.quizId === quizId
    ) as QuizAnswer;

    const answersInLanguage = getAnswersByLanguage(quiz, lang as string);

    return NextResponse.json(answersInLanguage, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
