import React, { useState, useEffect } from "react";
import Moralis from "moralis";

export default function TrotelPrice() {
  const [tokenPrice, setTokenPrice] = useState<number>(0);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        await Moralis.start({
          apiKey:
            "IQ9YzKq3oTR3WPUAXZL6dKDDLb1kSokTmeysjrW39wEzILKxZyCJzX10cIodCPLJ",
        });

        // Fetch token price from Moralis EvmApi
        const response = await Moralis.EvmApi.token.getTokenPrice({
          chain: "0x38", // Binance Smart Chain
          include: "percent_change",
          address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5", // TrotelCoin (TROTEL) token address
        });

        // Set the token price in state
        setTokenPrice(response.raw.usdPrice);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTokenInfo();
  }, []);

  return tokenPrice.toFixed(3).toString();
}
