import { supabase } from "@/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";
import { z } from "zod";
import { isUserAuthenticated } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  address: z.custom<Address>(),
  item: z.string()
});

/* POST /api/user/item/number-of-used
 * Returns the number of times an item has been used by a user.
 * @param {string} address - The wallet address of the user.
 * @param {string} item - The name of the item.
 * @returns {number} number_of_use - The number of times the item has been used by the user.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  if (!isUserAuthenticated(req)) {
    return NextResponse.json(
      { error: "You are not authenticated." },
      { status: 401 }
    );
  }

  let alreadyUsed = 0;

  try {
    const { address, item } = inputSchema.safeParse({
      address: body.address,
      item: body.item
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
          number_of_use: 1
        }
      ]);

      return NextResponse.json(1, {
        status: 200,
        headers: { "Cache-Control": "no-store" }
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
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(0, { status: 500 });
  }
}
