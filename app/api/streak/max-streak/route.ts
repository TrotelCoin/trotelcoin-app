import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import rateLimit from "@/utils/api/rateLimit";

export const dynamic = "force-dynamic";

/* GET /api/streak/max-streak
 * Returns the maximum streak.
 * @returns {number} max_streak - The maximum streak.
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
    const { data: result } = await supabase
      .from("streak")
      .select("max_streak")
      .order("max_streak", { ascending: false });

    if (!result) {
      return NextResponse.json(0, { status: 404 });
    }

    return NextResponse.json(result[0].max_streak, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
