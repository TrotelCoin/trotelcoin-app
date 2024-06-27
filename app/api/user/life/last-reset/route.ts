import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>()
});

/* GET /api/user/life/last-reset
 * Returns the last reset life countdown.
 * @param {string} wallet - The wallet address of the user.
 * @returns {Date} last_reset_at - The last reset life countdown.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet")
    }).data as unknown as { wallet: Address };

    // get reset life countdown
    const { data } = await supabase
      .from("life")
      .select("last_reset_at")
      .eq("wallet", wallet as string);

    if (data && data.length > 0) {
      const lastResetAt = data[0].last_reset_at;
      return NextResponse.json(lastResetAt, {
        status: 200,
        headers: { "Cache-Control": "no-store" }
      });
    } else {
      await supabase.from("life").insert({ wallet: wallet as string, life: 3 });

      return NextResponse.json(new Date().toISOString(), {
        status: 200,
        headers: { "Cache-Control": "no-store" }
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(new Date().toISOString(), { status: 500 });
  }
}
