import { supabase } from "@/utils/supabase/db";
import remainingRewards from "@/data/rewards/remainingRewards";
import { NextRequest, NextResponse } from "next/server";
import rateLimit from "@/utils/api/rateLimit";

export const dynamic = "force-dynamic";

/* GET /api/rewards/remaining
 * Returns the remaining rewards.
 * @returns {number} remainingRewards - The remaining rewards.
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
    // Reset rewards if 24h has passed
    await supabase
      .from("algorithm")
      .update({
        remaining_rewards: remainingRewards,
        updated_at: new Date().toISOString(),
      })
      .lte(
        "updated_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      );

    const { data: result } = await supabase
      .from("algorithm")
      .select("remaining_rewards");

    if (result && result[0] && "remaining_rewards" in result[0]) {
      return NextResponse.json(result[0].remaining_rewards, {
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
