import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";
import { isUserAuthenticated } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>()
});

/* GET /api/user/courses/courses-completed
 * Returns the courses completed by a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {Array<{quiz_id: number, answered: boolean}>} courses - The courses completed by the user.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  if (!isUserAuthenticated(req)) {
    return NextResponse.json(
      { error: "You are not authenticated." },
      { status: 401 }
    );
  }

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet")
    }).data as unknown as { wallet: Address };

    // get courses completed by user
    const { data: courses } = await supabase
      .from("quizzes_answered")
      .select("quiz_id, answered")
      .eq("wallet", wallet)
      .eq("answered", true);

    // return courses
    if (courses) {
      return NextResponse.json(courses, {
        status: 200,
        headers: { "Cache-Control": "no-store" }
      });
    } else {
      return NextResponse.json([], {
        status: 500
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
