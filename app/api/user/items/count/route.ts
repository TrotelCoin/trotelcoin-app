import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  address: z.custom<Address>(),
  item: z.string(),
});

/* GET /api/user/items/count
 * Returns the number of times an item has been used by a user.
 * @param {string} address - The wallet address of the user.
 * @param {string} item - The item name.
 * @returns {number} number_of_use - The number of times the item has been used by the user.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  try {
    const { address, item } = inputSchema.safeParse({
      address: searchParams.get("address"),
      item: searchParams.get("item"),
    }).data as unknown as { address: Address; item: string };

    const { data } = await supabase
      .from("items")
      .select("number_of_use")
      .eq("wallet", address)
      .eq("name", item);

    if (data && data.length > 0) {
      return NextResponse.json(data[0]?.number_of_use, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.json(0, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
