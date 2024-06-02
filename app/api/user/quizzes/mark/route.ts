import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  quizId: z.number(),
  numberOfWrongAnswers: z.number(),
  totalQuestions: z.number(),
  wallet: z.custom<Address>(),
});

/* POST /api/user/quizzes/mark
 * Submit the results of a quiz.
 * @param {number} quizId - The ID of the quiz.
 * @param {number} numberOfWrongAnswers - The number of wrong answers.
 * @param {number} totalQuestions - The total number of questions.
 * @param {string} wallet - The wallet address of the user.
 * @returns {string} message - The message.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  try {
    const { quizId, numberOfWrongAnswers, totalQuestions, wallet } =
      inputSchema.safeParse({
        quizId: Number(searchParams.get("quizId")),
        numberOfWrongAnswers: Number(searchParams.get("numberOfWrongAnswers")),
        totalQuestions: Number(searchParams.get("totalQuestions")),
        wallet: searchParams.get("wallet"),
      }).data as unknown as {
        quizId: number;
        numberOfWrongAnswers: number;
        totalQuestions: number;
        wallet: Address;
      };

    const { data } = await supabase
      .from("quizzes_results")
      .select("marks")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet);

    if (data && data.length > 0) {
      return NextResponse.json("Already exists", {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const numberOfGoodAnswers = Math.max(
      0,
      Number(totalQuestions) - Number(numberOfWrongAnswers)
    );

    await supabase.from("quizzes_results").insert({
      quiz_id: Number(quizId),
      wallet: wallet,
      number_of_wrong_answers: Number(numberOfWrongAnswers),
      total_questions: Number(totalQuestions),
      answered_at: new Date().toISOString(),
      marks: (Number(numberOfGoodAnswers) / Number(totalQuestions)) * 20,
    });

    return NextResponse.json("Results submitted", {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
