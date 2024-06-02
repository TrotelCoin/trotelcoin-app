import rateLimit from "@/utils/api/rateLimit";
import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/* GET /api/learners/count
 * Returns the number of learners.
 * @returns {number} count - The number of learners.
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
    const { count } = await supabase
      .from("learners")
      .select("*", { count: "exact", head: true });

    if (count) {
      return NextResponse.json(count, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      return NextResponse.json(0, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
