import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>(),
});

/* POST /api/items/use-potion
 * Restores the user's life.
 * @param {string} wallet - The wallet address of the user.
 * @returns {string} message - Indicates the result of the operation.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: searchParams.get("wallet"),
    }).data as unknown as { wallet: Address };

    const { data: life } = await supabase
      .from("life")
      .select("life")
      .eq("wallet", wallet);

    if (life && life.length > 0) {
      const { error } = await supabase
        .from("life")
        .update({
          life: life[0].life + 1,
        })
        .eq("wallet", wallet);

      if (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
      }
    } else {
      return NextResponse.json("Learner not found", { status: 404 });
    }

    return NextResponse.json("Life updated", {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
