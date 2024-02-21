import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest, res: NextResponse) {
  const centralWallet = new ethers.Wallet(process.env.PRIVATE_KEY as Address);

  const centralWalletAddress: Address = centralWallet.address as Address;

  if (!centralWalletAddress) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  return NextResponse.json(centralWalletAddress, { status: 200 });
}
