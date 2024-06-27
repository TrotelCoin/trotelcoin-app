import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";
import { isUserAuthenticated } from "@/utils/auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
  rating: z.number().min(0).max(5),
  quizId: z.number()
});

/* POST /api/user/course/satisfaction
 * Saves a user's satisfaction rating for a course.
 * @param {string} wallet - The wallet address of the user.
 * @param {number} rating - The user's rating for the course.
 * @param {number} quizId - The ID of the quiz.
 * @returns {boolean} success - Indicates whether the rating was saved successfully.
 * @returns {string} answered - Indicates that the user has already answered this.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  if (!isUserAuthenticated(req)) {
    return NextResponse.json(
      { error: "You are not authenticated." },
      { status: 401 }
    );
  }

  try {
    const { wallet, rating, quizId } = inputSchema.safeParse({
      wallet: body.wallet,
      rating: body.rating,
      quizId: body.quizId
    }).data as unknown as { wallet: Address; rating: number; quizId: number };

    const { data: verification } = await supabase
      .from("courses_satisfaction")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet);

    if (verification && verification.length > 0) {
      return NextResponse.json(
        { answered: "You have already answered this." },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    await supabase.from("courses_satisfaction").insert([
      {
        wallet: wallet,
        rating: rating,
        timestamp: new Date().toISOString(),
        quiz_id: quizId
      }
    ]);

    return NextResponse.json(
      { success: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
