import React, { useState, useEffect } from "react";
import TrotelBalanceNumber from "./trotelBalanceNumber";
import Moralis from "moralis";

const ApproxUSD = () => {
  // Define state variables to store the token price and approximate USD value
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [approxUSD, setApproxUSD] = useState<number>(0);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Check if Moralis is already started
        if (!Moralis.Core.isStarted) {
          // Initialize Moralis with the API key
          await Moralis.start({
            apiKey:
              "IQ9YzKq3oTR3WPUAXZL6dKDDLb1kSokTmeysjrW39wEzILKxZyCJzX10cIodCPLJ",
          });
        }

        // Fetch token price from Moralis EvmApi
        const response = await Moralis.EvmApi.token.getTokenPrice({
          chain: "0x38", // Binance Smart Chain
          include: "percent_change",
          address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5", // TrotelCoin (TROTEL) token address
        });

        // Fetch the token price by rendering the TrotelPrice component
        const price: number = response.raw.usdPrice;
        setTokenPrice(price);

        // Get the token balance value by rendering the TrotelBalanceNumber component
        const tokenBalanceValue: number = TrotelBalanceNumber();

        // Calculate the approximate USD value based on token balance and price
        const approxUSD: number = tokenBalanceValue * price;
        setApproxUSD(approxUSD);
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    // Call the fetchTokenInfo function when the component mounts
    fetchTokenInfo();
  }, []);

  // Render the approximate USD value with two decimal places
  return <span>{approxUSD.toFixed(2)}</span>;
};

export default ApproxUSD;
