import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";
import { isAuthenticated } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  wallet: z.custom<Address>()
});

/* POST /api/user/items/use-potion
 * Restores the user's life.
 * @param {string} wallet - The wallet address of the user.
 * @returns {string} message - Indicates the result of the operation.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const isAuthorized: boolean = await isAuthenticated(req);

  if (!isAuthorized) {
    return NextResponse.json(
      { error: "You are not authenticated." },
      { status: 401 }
    );
  }

  try {
    const { wallet } = inputSchema.safeParse({
      wallet: body.wallet
    }).data as unknown as { wallet: Address };

    const { data: life } = await supabase
      .from("life")
      .select("life")
      .eq("wallet", wallet);

    if (life && life.length > 0) {
      const { error } = await supabase
        .from("life")
        .update({
          life: life[0].life + 1
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
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
