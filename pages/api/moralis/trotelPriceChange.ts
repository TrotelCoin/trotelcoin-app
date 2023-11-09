import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });
    }

    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: "0x38",
      include: "percent_change",
      address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5",
    });

    const priceChange = parseFloat(response.raw["24hrPercentChange"] ?? "0");

    res.status(200).json({ priceChange });
  } catch (error) {
    res.status(500).json({ error: "Error fetching token price change" });
  }
}
