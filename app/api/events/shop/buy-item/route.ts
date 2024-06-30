import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { z } from "zod";
import { Address } from "viem";
import type { ShopLog } from "@/types/events/shop";

/** GET /api/events/shop/buy-item
 * Every shop event
 * @returns {object} shop_logs - The shop logs.
 * @example response - 200 - application/json
 */
export async function GET() {
  try {
    const { data: shop_logs } = await supabase
      .from("shop_logs")
      .select("*")
      .eq("event", "Buy Item");

    const shopLogs: ShopLog[] = shop_logs as unknown as ShopLog[];

    return NextResponse.json(shopLogs, {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

const inputSchema = z.object({
  wallet: z.custom<Address>(),
  itemId: z.number(),
  quantity: z.number(),
  price: z.number(),
  trotelPrice: z.number().nullable(),
  chainId: z.number()
});

/** POST /api/events/shop/buy-item
 * Increases the staking amount of a user.
 * @param {Address} wallet - The wallet address of the user.
 * @param {number} itemId - The ID of the item to buy.
 * @param {number} quantity - The quantity of the item to buy.
 * @param {number} price - The price of the item.
 * @param {number} trotelPrice - The price of TROTEL.
 * @param {number} chainId - The chain ID of the network.
 * @returns {object} shop_log - The shop log of the user.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { wallet, itemId, quantity, price, trotelPrice, chainId } =
      inputSchema.safeParse(body).data as unknown as {
        wallet: Address;
        itemId: number;
        quantity: number;
        price: number;
        trotelPrice: number | null;
        chainId: number;
      };

    const { data: result } = await supabase.from("shop_logs").insert({
      wallet,
      event: "Buy Item",
      item_id: itemId,
      quantity,
      price,
      trotel_price: trotelPrice,
      chain_id: chainId,
      event_at: new Date().toISOString()
    });

    return NextResponse.json(result, {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
