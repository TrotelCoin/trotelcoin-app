import { NextRequest, NextResponse } from "next/server";
import { walletClient, publicClient } from "@/utils/viem/clients";
import { contracts } from "@/data/web3/addresses";
import trotelCoinABI from "@/abi/polygon/trotelcoin/trotelCoin";
import { Address, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { z } from "zod";

import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

const account = privateKeyToAccount(process.env.PRIVATE_KEY_WALLET as Address);

const inputSchema = z.object({
  address: z.custom<Address>(),
  amount: z
    .number()
    .max(100000, "Amount exceed the limit of claiming rewards."),
  chainId: z.number()
});

/* POST /api/user/claim-rewards
 * Mints a specific amount of TrotelCoin to a user's address.
 * @param {string} address - The address of the user.
 * @param {number} amount - The amount of TrotelCoin to mint.
 * @returns {string} hash - The hash of the transaction.
 * @example response - 200 - application/json
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const session = await getServerSession();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session || !token) {
    return NextResponse.json(
      { error: "You need to be logged in." },
      { status: 401 }
    );
  }

  try {
    const { userAddress, amount, chainId } = inputSchema.safeParse({
      address: searchParams.get("address"),
      amount: Number(searchParams.get("amount")),
      chainId: Number(searchParams.get("chainId"))
    }).data as unknown as {
      userAddress: Address;
      amount: number;
      chainId: number;
    };

    // prepare transaction
    const { request } = await publicClient.simulateContract({
      address: contracts[chainId].trotelCoinAddress,
      abi: trotelCoinABI,
      functionName: "mint",
      account: account,
      args: [userAddress, parseEther(Number(amount).toFixed(18))]
    });

    // make transaction
    const hash = await walletClient.writeContract(request);

    return NextResponse.json({ success: true, hash: hash }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
