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
import { getServerSession } from "next-auth";
import dotenv from "dotenv";

export const dynamic = "force-dynamic";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY_WALLET as Address;

const account = privateKeyToAccount(privateKey);

const inputSchema = z.object({
  userAddress: z.custom<Address>(),
  amount: z
    .number()
    .max(100000, "Amount exceed the limit of claiming rewards."),
  chain: z.custom<Chain>()
});

/* POST /api/user/claim-rewards
 * Mints a specific amount of TrotelCoin to a user's address.
 * @param {string} address - The address of the user.
 * @param {number} amount - The amount of TrotelCoin to mint.
 * @param {Chain} chain - The chain of the user.
 * @returns {string} hash - The hash of the transaction.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "You need to be logged in." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { userAddress, amount, chain } = inputSchema.parse({
      userAddress: searchParams.get("address"),
      amount: Number(searchParams.get("amount")),
      chain: body.chain
    });

    let hash;

    // prepare transaction
    if (!chain.testnet) {
      const { request } = await publicClient.simulateContract({
        address: contracts[chain.id].trotelCoinAddress,
        abi: abis[chain.id].trotelCoin,
        functionName: "mint",
        account: account as Account,
        args: [getAddress(userAddress), parseEther(Number(amount).toFixed(18))],
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
        args: [getAddress(userAddress), parseEther(Number(amount).toFixed(18))],
        chain: chain
      });

      // make transaction
      hash = await testWalletClient.writeContract(request);
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
