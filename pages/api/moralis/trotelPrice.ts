import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import { polygon } from "wagmi/chains";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    const tokenPrice = response.raw.usdPrice;

    res.status(200).json({ tokenPrice });
  } catch (error) {
    res.status(500).json({ error: "Error fetching token price" });
  }
}
