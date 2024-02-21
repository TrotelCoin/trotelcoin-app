import { NextRequest, NextResponse } from "next/server";
import { walletClient, publicClient } from "@/lib/viem/client";
import { trotelCoinAddress } from "@/data/web3/addresses";
import trotelcoinV1ABI from "@/abi/trotelCoinV1";
import { Address, parseEther } from "viem";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userAddress = searchParams.get("address");
  const amount = searchParams.get("amount");
  const gas = searchParams.get("gas");
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

    if (!gas) {
      return NextResponse.json(
        { error: "Please provide a valid gas." },
        { status: 400 }
      );
    }

    // prepare transaction
    const { request } = await publicClient.simulateContract({
      address: trotelCoinAddress,
      abi: trotelcoinV1ABI,
      functionName: "mint",
      account: centralWalletAddress as Address,
      args: [userAddress as Address, parseEther(amount)],
      gas: parseEther(gas),
    });

    // make transaction
    await walletClient.writeContract(request);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
