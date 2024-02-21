import { ethers } from "ethers";
import { trotelCoinAddress } from "@/data/web3/addresses";
import trotelCoinV1ABI from "@/abi/trotelCoinV1";
import { NextRequest, NextResponse } from "next/server";

const privateKeyWallet = process.env.PRIVATE_KEY_WALLET as string;

const network = ethers.Network.from("matic");
const provider = ethers.getDefaultProvider(network);
const centralWallet = new ethers.Wallet(privateKeyWallet, provider);

const trotelCoinContract = new ethers.Contract(
  trotelCoinAddress,
  trotelCoinV1ABI,
  centralWallet
);

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userAddress = searchParams.get("address");
  const amount = searchParams.get("amount");

  if (!userAddress || !amount) {
    return NextResponse.json(
      { error: "Address or amount is missing." },
      { status: 400 }
    );
  }

  try {
    // estimate gas price
    const gasPrice = await trotelCoinContract.mint.estimateGas(
      userAddress,
      amount
    );

    // return gas price
    return NextResponse.json(parseFloat(gasPrice.toString()), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
