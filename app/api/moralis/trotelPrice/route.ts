import { trotelCoinAddress } from "@/data/addresses";
import Moralis from "moralis";
import { NextRequest, NextResponse } from "next/server";
import { polygon } from "viem/chains";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });
    }

    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: polygon.id,
      include: "percent_change",
      address: trotelCoinAddress,
    });

    const tokenPrice = response.raw.usdPrice;

    return new NextResponse(JSON.stringify(tokenPrice), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching token price", { status: 500 });
  }
}
