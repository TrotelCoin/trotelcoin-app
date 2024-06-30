import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/db";
import type { StakingEvent } from "@/types/staking/events";
import { intermediateStakingBalance } from "@/data/staking/premium";
import { polygonAmoy } from "viem/chains";

/** GET /api/statistics/intermediate
 * The number of wallets with a staking balance above the intermediate threshold.
 * @returns {number} intermediate - The number of wallets with a staking balance above the intermediate threshold.
 * @example response - 200 - application/json
 **/
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await supabase.from("staking_logs").select("*");

    if (!data || data.length <= 0) {
      return NextResponse.json(null, { status: 404 });
    }

    // get the wallet stakes
    const walletStakes = new Map<string, number>();

    // calculate the wallet stakes
    data
      .filter((log) => log.chainId !== polygonAmoy.id)
      .forEach((log) => {
        const currentAmount = walletStakes.get(log.wallet) ?? 0;
        if (log.event === "Stake" || log.event === "Increase Staking") {
          walletStakes.set(log.wallet, currentAmount + log.amount);
        } else if (log.event === "Unstake") {
          walletStakes.set(log.wallet, currentAmount - log.amount);
        }
      });

    const walletsAboveIntermediateThreshold = Array.from(
      walletStakes.values()
    ).filter((amount) => amount >= intermediateStakingBalance);

    const numberOfIntermediate: number = walletsAboveIntermediateThreshold.length as number;

    return NextResponse.json(numberOfIntermediate, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
