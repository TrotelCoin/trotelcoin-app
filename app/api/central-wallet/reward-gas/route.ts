import { publicClient } from "@/utils/viem/client";
import { NextRequest, NextResponse } from "next/server";
import trotelCoinABI from "@/abi/trotelCoin";
import { Address, parseEther } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userAddress: Address = searchParams.get("address") as Address;
  const amount: number = Number(searchParams.get("amount"));
  const centralWalletAddress: Address = searchParams.get(
    "centralWalletAddress"
  ) as Address;

  try {
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
