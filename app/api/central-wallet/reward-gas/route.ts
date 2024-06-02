import { publicClient } from "@/utils/viem/clients";
import { NextRequest, NextResponse } from "next/server";
import trotelCoinABI from "@/abi/trotelcoin/trotelCoin";
import { Address, parseEther } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inputSchema = z.object({
  address: z.custom<Address>(),
  amount: z.number(),
  centralWalletAddress: z.custom<Address>(),
});

/* GET /api/central-wallet/reward-gas
 * Estimates the gas required to mint a specific amount of TrotelCoin to a user's address.
 * @param {string} address - The address of the user.
 * @param {number} amount - The amount of TrotelCoin to mint.
 * @param {string} centralWalletAddress - The address of the central wallet.
 * @returns {number} gas - The estimated gas required to mint the TrotelCoin.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  try {
    const { userAddress, amount, centralWalletAddress } = inputSchema.safeParse(
      {
        address: searchParams.get("address"),
        amount: Number(searchParams.get("amount")),
        centralWalletAddress: searchParams.get("centralWalletAddress"),
      }
    ).data as unknown as {
      userAddress: Address;
      amount: number;
      centralWalletAddress: Address;
    };

    const gas = await publicClient.estimateContractGas({
      address: trotelCoinAddress,
      abi: trotelCoinABI,
      functionName: "mint",
      account: centralWalletAddress,
      args: [userAddress, parseEther(String(amount))],
    });

    return NextResponse.json(parseFloat(gas.toString()), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
