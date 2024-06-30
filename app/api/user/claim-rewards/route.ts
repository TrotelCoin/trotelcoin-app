import { NextRequest, NextResponse } from "next/server";
import {
  walletClient,
  publicClient,
  testPublicClient,
  testWalletClient
} from "@/utils/viem/clients";
import contracts from "@/data/web3/addresses";
import abis from "@/abis/abis";
import { Address, parseEther, getAddress, Chain } from "viem";
import { privateKeyToAccount, Account } from "viem/accounts";
import { z } from "zod";
import dotenv from "dotenv";
import { isAuthenticated } from "@/utils/auth/auth";
import { supabase } from "@/utils/supabase/db";

export const dynamic = "force-dynamic";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY_WALLET as Address;

const account = privateKeyToAccount(privateKey);

const getInputSchema = z.object({
  wallet: z.custom<Address>()
});

/* GET /api/user/claim-rewards
 * Get the latest mint date of the user.
 * @param {string} address - The address of the user.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const isAuthorized: boolean = await isAuthenticated(req);

  if (!isAuthorized) {
    return NextResponse.json(
      { error: "You are not authenticated." },
      { status: 401 }
    );
  }

  try {
    const { wallet } = getInputSchema.safeParse({
      wallet: searchParams.get("wallet")
    }).data as unknown as { wallet: Address };

    const { data: userLastMintedDateData } = await supabase
      .from("learners")
      .select("last_minted_at")
      .eq("wallet", wallet);

    if (!userLastMintedDateData || userLastMintedDateData.length <= 0) {
      return NextResponse.json(
        { error: "User has not claimed rewards yet." },
        { status: 404 }
      );
    }

    const userLastMintedDate = new Date(
      userLastMintedDateData[0].last_minted_at
    );

    return NextResponse.json(userLastMintedDate, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

const postInputSchema = z.object({
  wallet: z.custom<Address>(),
  chain: z.custom<Chain>(),
  trotelPrice: z.number().nullable()
});

/* POST /api/user/claim-rewards
 * Mints a specific amount of TrotelCoin to a user's address.
 * @param {string} address - The address of the user.
 * @param {Chain} chain - The chain of the user.
 * @param {number} trotelPrice - The price of TrotelCoin.
 * @returns {string} hash - The hash of the transaction.
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
    const { wallet, chain, trotelPrice } = postInputSchema.safeParse({
      wallet: body.wallet,
      chain: body.chain,
      trotelPrice: body.trotelPrice
    }).data as unknown as {
      wallet: Address;
      chain: Chain;
      trotelPrice: number | null;
    };

    const { data: userLastMintedDateData } = await supabase
      .from("learners")
      .select("last_minted_at")
      .eq("wallet", wallet);

    if (!userLastMintedDateData || userLastMintedDateData.length <= 0) {
      await supabase
        .from("learners")
        .update({ last_minted_at: new Date().toISOString() })
        .eq("wallet", wallet);
    } else {
      // check if user has claimed rewards in the last 7 days
      const userLastMintedDate = new Date(
        userLastMintedDateData[0].last_minted_at
      );

      const currentDate = new Date();

      const diffTime = Math.abs(
        currentDate.getTime() - userLastMintedDate.getTime()
      );

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 7) {
        return NextResponse.json(
          { error: "You can only claim rewards once a week." },
          { status: 400 }
        );
      }

      await supabase
        .from("learners")
        .update({ last_minted_at: new Date().toISOString() })
        .eq("wallet", wallet);
    }

    const { data: userRewardsPendingData } = await supabase
      .from("learners")
      .select("total_rewards_pending")
      .eq("wallet", wallet);

    console.log(userRewardsPendingData);

    if (!userRewardsPendingData || userRewardsPendingData.length <= 0) {
      return NextResponse.json(
        { error: "User does not have any pending rewards." },
        { status: 404 }
      );
    }

    // get user's pending rewards
    const userRewardsPending: number = userRewardsPendingData[0]
      .total_rewards_pending as number;

    if (userRewardsPending <= 0) {
      return NextResponse.json(
        { error: "User does not have any pending rewards to claim." },
        { status: 404 }
      );
    }

    // ensure that the amount is not greater than 1000
    const amount = Math.min(userRewardsPending, 1000);

    let hash;

    // prepare transaction
    if (!chain.testnet) {
      const { request } = await publicClient.simulateContract({
        address: contracts[chain.id].trotelCoinAddress,
        abi: abis[chain.id].trotelCoin,
        functionName: "mint",
        account: account as Account,
        args: [getAddress(wallet), parseEther(Number(amount).toFixed(18))],
        chain: chain
      });

      // make transaction
      hash = await walletClient.writeContract(request);
    } else {
      const { request } = await testPublicClient.simulateContract({
        address: contracts[chain.id].trotelCoinAddress,
        abi: abis[chain.id].trotelCoin,
        functionName: "mint",
        account: account as Account,
        args: [getAddress(wallet), parseEther(Number(amount).toFixed(18))],
        chain: chain
      });

      // make transaction
      hash = await testWalletClient.writeContract(request);
    }

    // reset user's pending rewards to 0 if user balance was < 1000 else subtract 1000 from user's pending rewards
    await supabase
      .from("learners")
      .update({ total_rewards_pending: userRewardsPending - amount })
      .eq("wallet", wallet);

    // log the event in the database
    if (!chain.testnet) {
      await supabase.from("rewards_logs").insert({
        wallet: wallet,
        amount: amount,
        minted_at: new Date().toISOString(),
        trotel_price: trotelPrice
      });
    }

    return NextResponse.json({ success: true, hash: hash }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
