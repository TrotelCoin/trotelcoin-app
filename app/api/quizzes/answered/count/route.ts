import rateLimit from "@/utils/api/rateLimit";
import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/* GET /api/quizzes/answered/count
 * Returns the number of quizzes answered.
 * @returns {number} count - The number of quizzes answered.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  if (await rateLimit(req, res)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const { data } = await supabase
      .from("learners")
      .select("number_of_quizzes_answered");

    if (!data) {
      return NextResponse.json(0, { status: 404 });
    }

    const result: number = data.reduce(
      (acc, curr) => acc + curr.number_of_quizzes_answered,
      0
    );

    return NextResponse.json(result, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
