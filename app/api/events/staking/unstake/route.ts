import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import { z } from "zod";
import { Address } from "viem";
import type { StakingLog } from "@/types/events/staking";

/** GET /api/events/staking/unstake
 * Every staking event
 * @returns {object} staking_logs - The staking logs.
 * @example response - 200 - application/json
 */
export async function GET() {
  try {
    const { data: unstaking_logs } = await supabase
      .from("staking_logs")
      .select("*")
      .eq("event", "Unstake");

    const UnstakingLogs: StakingLog[] =
      unstaking_logs as unknown as StakingLog[];

    return NextResponse.json(UnstakingLogs, {
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
  amount: z.number(),
  reward: z.number(),
  trotelPrice: z.number(),
  chainId: z.number()
});

/** POST /api/events/staking/unstake
 * Increases the staking amount of a user.
 * @param {Address} wallet - The wallet address of the user.
 * @param {number} amount - The amount to stake.
 * @param {number} reward - The reward to stake.
 * @param {number} trotelPrice - The price of TROTEL.
 * @param {number} chainId - The chain ID of the network.
 * @returns {object} staking_log - The staking log of the user.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { wallet, amount, reward, trotelPrice, chainId } =
      inputSchema.safeParse(body).data as unknown as {
        wallet: Address;
        amount: number;
        reward: number;
        trotelPrice: number;
        chainId: number;
      };

    const { data: result } = await supabase.from("staking_logs").insert({
      wallet,
      event: "Unstake",
      amount,
      reward,
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
