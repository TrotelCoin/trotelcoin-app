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
      address: "0x85057d5a8d063f9075Ba963101D76352051675E5",
    });

    const priceChange = parseFloat(response.raw["24hrPercentChange"] ?? "0");

    return NextResponse.json(priceChange, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching token price change" },
      { status: 500 }
    );
  }
}
