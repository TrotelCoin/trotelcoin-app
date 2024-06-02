import quizzes from "@/data/quizzes/quizData";
import { NextRequest, NextResponse } from "next/server";
import { getQuestionsByLanguage } from "@/utils/quizzes/getQuestionsByLanguage";
import { Lang } from "@/types/language/lang";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  quizId: z.number(),
  lang: z.custom<Lang>(),
});

/* GET /api/quizzes/questions?quizId=1&lang=en
 * Returns the questions for a quiz in a specific language.
 * @param {number} quizId - The ID of the quiz.
 * @param {string} lang - The language of the questions.
 * @returns {string[]} questions - The questions for the quiz in the specified language.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  try {
    const { quizId, lang } = inputSchema.safeParse({
      quizId: Number(searchParams.get("quizId")),
      lang: searchParams.get("lang"),
    }).data as { quizId: number; lang: Lang };

    const quiz = quizzes.find((quiz) => quiz.quizId === quizId);

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const questionsInLanguage = getQuestionsByLanguage(quiz, lang);

    if (!questionsInLanguage) {
      return NextResponse.json(
        { error: "Language not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(questionsInLanguage, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
