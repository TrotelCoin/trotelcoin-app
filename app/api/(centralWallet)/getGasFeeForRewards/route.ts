import { publicClient } from "@/lib/viem/client";
import { NextRequest, NextResponse } from "next/server";
import trotelCoinABI from "@/abi/trotelCoin";
import { Address, parseEther } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userAddress = searchParams.get("address");
  const amount = searchParams.get("amount");
  const centralWalletAddress = searchParams.get("centralWalletAddress");

  try {
    if (!userAddress) {
      return NextResponse.json(
        { error: "Please provide a valid user address." },
        { status: 400 }
      );
    }

    if (!amount) {
      return NextResponse.json(
        { error: "Please provide a valid amount." },
        { status: 400 }
      );
    }

    const gas = await publicClient.estimateContractGas({
      address: trotelCoinAddress,
      abi: trotelCoinABI,
      functionName: "mint",
      account: centralWalletAddress as Address,
      args: [userAddress, parseEther(amount)],
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
