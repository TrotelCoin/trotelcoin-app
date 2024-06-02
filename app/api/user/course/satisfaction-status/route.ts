import rateLimit from "@/utils/api/rateLimit";
import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  quizId: z.number(),
  wallet: z.custom<Address>(),
});

/* GET /api/user/course/satisfaction-status
 * Checks if a user has already answered the satisfaction quiz for a course.
 * @param {string} wallet - The wallet address of the user.
 * @param {number} quizId - The ID of the quiz.
 * @returns {boolean} answered - Indicates whether the user has already answered the quiz.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

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
    const { quizId, wallet } = inputSchema.safeParse({
      quizId: Number(searchParams.get("quizId")),
      wallet: searchParams.get("wallet"),
    }).data as unknown as { quizId: number; wallet: Address };

    const { data } = await supabase
      .from("courses_satisfaction")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet);

    if (data && data.length > 0) {
      return NextResponse.json(
        { answered: "You have already answered this." },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    } else {
      return NextResponse.json(
        { answered: false },
        {
          status: 200,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ answered: false }, { status: 500 });
  }
}
