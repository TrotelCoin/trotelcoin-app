import rateLimit from "@/utils/api/rateLimit";
import { supabase } from "@/utils/supabase/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  address: z.custom<Address>(),
  item: z.string(),
});

/* POST /api/user/item/number-of-used
 * Returns the number of times an item has been used by a user.
 * @param {string} address - The wallet address of the user.
 * @param {string} item - The name of the item.
 * @returns {number} number_of_use - The number of times the item has been used by the user.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
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

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "You need to be logged in." },
      { status: 401 }
    );
  }

  let alreadyUsed = 0;

  try {
    const { address, item } = inputSchema.safeParse({
      address: searchParams.get("address"),
      item: searchParams.get("item"),
    }).data as unknown as { address: Address; item: string };

    const { data: alreadyUsedData } = await supabase
      .from("items")
      .select("number_of_use")
      .eq("wallet", address)
      .eq("name", item);

    if (!alreadyUsedData || alreadyUsedData.length === 0) {
      await supabase.from("items").insert([
        {
          wallet: address,
          name: item,
          number_of_use: 1,
        },
      ]);

      return NextResponse.json(1, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      });
    } else {
      alreadyUsed = alreadyUsedData[0].number_of_use;
    }

    const { data } = await supabase
      .from("items")
      .update({ number_of_use: alreadyUsed + 1 })
      .eq("wallet", address)
      .eq("name", item);

    return NextResponse.json(data, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
