import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* GET /api/user/quiz/answered
 * Returns whether a user has answered a quiz.
 * @param {string} wallet - The wallet address of the user.
 * @param {number} quizId - The ID of the quiz.
 * @returns {boolean} answered - Whether the user has answered the quiz.
 * @security None
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;
  const quizId: number = Number(searchParams.get("quizId"));

  try {
    // select answered from "quizzes_answered"
    const { data: result } = await supabase
      .from("quizzes_answered")
      .select("answered, quiz_id")
      .eq("wallet", wallet);

    if (!Array.isArray(result)) {
      return NextResponse.json(false, { status: 500 });
    }

    const matchingResult = result.find((object) => object.quiz_id === quizId);

    let answeredValue = false;

    if (matchingResult) {
      answeredValue = matchingResult.answered;
    }

    return NextResponse.json(answeredValue, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(false, { status: 500 });
  }
}
