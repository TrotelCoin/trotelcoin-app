import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

import { z } from "zod";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
  quizId: z.number()
});

/* GET /api/user/quiz/answered
 * Returns whether a user has answered a quiz.
 * @param {string} wallet - The wallet address of the user.
 * @param {number} quizId - The ID of the quiz.
 * @returns {boolean} answered - Whether the user has answered the quiz.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "You need to be logged in." },
      { status: 401 }
    );
  }

  try {
    const { wallet, quizId } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
      quizId: Number(searchParams.get("quizId"))
    }).data as unknown as { wallet: Address; quizId: number };

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
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(false, { status: 500 });
  }
}
