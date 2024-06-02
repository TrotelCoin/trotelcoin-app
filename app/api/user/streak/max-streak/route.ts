import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
});

/* GET /api/streak/max-streak
 * Returns the maximum streak.
 * @returns {number} max_streak - The maximum streak.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
    }).data as unknown as { wallet: Address };

    const { data: result } = await supabase
      .from("streak")
      .select("max_streak")
      .eq("wallet", wallet);

    if (result && result.length > 0) {
      return NextResponse.json(result[0].max_streak);
    } else {
      return NextResponse.json(0, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
