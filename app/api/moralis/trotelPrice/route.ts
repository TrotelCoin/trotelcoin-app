import { trotelCoinAddress } from "@/data/addresses";
import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import { polygon } from "viem/chains";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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

    res.status(200).json({ tokenPrice });
  } catch (error) {
    res.status(500).json({ error: "Error fetching token price" });
  }
}


