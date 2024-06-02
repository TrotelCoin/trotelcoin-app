import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import { Address } from "viem";

export const dynamic = "force-dynamic";

const centralWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET as Address
);

const centralWalletAddress: Address = centralWallet.address as Address;

/* GET /api/central-wallet/address
 * Returns the address of the central wallet.
 * @returns {string} centralWalletAddress - The address of the central wallet.
 * @example response - 200 - application/json
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json(centralWalletAddress, {
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
