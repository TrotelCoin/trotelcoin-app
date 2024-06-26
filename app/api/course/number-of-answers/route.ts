import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  quizId: z.number()
});

/* GET /api/course/number-of-answers?quizId=1
 * Returns the number of answers for a quiz.
 * @param {number} quizId - The ID of the quiz.
 * @returns {number} numberOfAnswers - The number of answers for the quiz.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  try {
    const { quizId } = inputSchema.safeParse({
      quizId: Number(searchParams.get("quizId"))
    }).data as unknown as { quizId: number };

    const { data } = await supabase
      .from("quizzes")
      .select("number_of_answers")
      .eq("quiz_id", quizId);

    if (!data) {
      return NextResponse.json(0, { status: 404 });
    }

    if (data.length > 0) {
      return NextResponse.json(data[0].number_of_answers, {
        status: 200,
        headers: { "Cache-Control": "no-store" }
      });
    } else {
      return NextResponse.json(0, {
        status: 200,
        headers: { "Cache-Control": "no-store" }
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
