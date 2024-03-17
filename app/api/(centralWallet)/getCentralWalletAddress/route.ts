import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

const centralWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET as Address
);

const centralWalletAddress: Address = centralWallet.address as Address;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json(centralWalletAddress, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
