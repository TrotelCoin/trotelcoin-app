import { NextRequest, NextResponse } from "next/server";
import { walletClient, publicClient } from "@/lib/viem/client";
import { trotelCoinAddress } from "@/data/web3/addresses";
import trotelCoinABI from "@/abi/trotelCoin";
import { Address, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export const dynamic = "force-dynamic";

const account = privateKeyToAccount(process.env.PRIVATE_KEY_WALLET as Address);

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userAddress: Address = searchParams.get("address") as Address;
  const amount: number = Number(searchParams.get("amount"));

  if (!userAddress || !amount) {
    return NextResponse.json("Parameters not found", { status: 400 });
  }

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

    // prepare transaction
    const { request } = await publicClient.simulateContract({
      address: trotelCoinAddress,
      abi: trotelCoinABI,
      functionName: "mint",
      account: account,
      args: [userAddress as Address, parseEther(String(amount))],
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
