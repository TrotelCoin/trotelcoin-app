import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* GET /api/user/course/satisfaction-status
 * Checks if a user has already answered the satisfaction quiz for a course.
 * @param {string} wallet - The wallet address of the user.
 * @param {number} quizId - The ID of the quiz.
 * @returns {boolean} answered - Indicates whether the user has already answered the quiz.
 * @security None
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;
  const quizId: number = Number(searchParams.get("quizId"));

  try {
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
