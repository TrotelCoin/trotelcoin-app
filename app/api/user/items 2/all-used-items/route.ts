import rateLimit from "@/utils/api/rateLimit";
import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  address: z.custom<Address>(),
});

/* GET /api/user/items/all-used-items
 * Returns all the items used by a user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {Array<{item_id: number, wallet: string}>} items - The items used by the user.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

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
    const { address } = inputSchema.safeParse({
      address: searchParams.get("wallet"),
    }).data as unknown as { address: Address };

    const { data } = await supabase
      .from("items")
      .select("*")
      .eq("wallet", address);

    if (data && data.length > 0) {
      return NextResponse.json(data, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.json(null, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
