import { publicClient } from "@/lib/viem/client";
import { NextRequest, NextResponse } from "next/server";
import trotelCoinV1ABI from "@/abi/trotelCoinV1";
import { parseEther } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";
import { centralWalletAddress } from "@/lib/viem/client";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userAddress = searchParams.get("address");
  const amount = searchParams.get("amount");

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
      abi: trotelCoinV1ABI,
      functionName: "mint",
      account: centralWalletAddress,
      args: [userAddress, parseEther(amount)],
    });

    return NextResponse.json(parseFloat(gas.toString()), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
