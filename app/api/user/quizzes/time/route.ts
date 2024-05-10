import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

/* GET /api/user/quizzes/time
 * Returns the total time spent on quizzes by a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {number} time - The total time spent on quizzes by the user.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const wallet: Address = searchParams.get("wallet") as Address;

  try {
    const { data } = await supabase
      .from("quizzes_times")
      .select("diffTime")
      .eq("wallet", wallet);

    let time: number = 0; // in ms

    if (data && data.length > 0) {
      data.forEach((diffTime) => {
        time += diffTime.diffTime;
      });
    } else {
      return NextResponse.json(time, { status: 404 });
    }

    return NextResponse.json(time, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}

/* POST /api/user/quizzes/time
 * Computes the time spent on a quiz by a user.
 * @param {number} quizId - The quiz id.
 * @param {string} wallet - The wallet address of the user.
 * @param {number} diffTime - The time spent on the quiz by the user.
 * @returns {string} message - The message.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const quizId: number = Number(searchParams.get("quizId"));
  const wallet: Address = searchParams.get("wallet") as Address;
  const diffTime: number = Number(searchParams.get("diffTime"));

  try {
    const { data } = await supabase
      .from("quizzes_times")
      .select("diffTime")
      .eq("quiz_id", quizId)
      .eq("wallet", wallet);

    if (data && data.length > 0) {
      return NextResponse.json("Already exists", {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      const { error } = await supabase.from("quizzes_times").insert({
        quiz_id: quizId,
        wallet: wallet,
        diffTime: diffTime,
      });

      if (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
      }

      return NextResponse.json("Time computed", {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
