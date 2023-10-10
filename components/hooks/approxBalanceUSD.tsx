import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { useBalance } from "wagmi";
import getAccount from "./getAccount";

interface BalanceData {
  data?: {
    formatted: string;
  };
  isError: boolean;
  isLoading: boolean;
}

const ApproxUSD = () => {
  // Define state variables to store the token price and approximate USD value
  const [approxUSD, setApproxUSD] = useState<number>(0);

  // Get the Ethereum address using the getAccount function
  const address = getAccount();

  // Use the useBalance hook within the functional component
  const { data, isError, isLoading }: BalanceData = useBalance({
    address: address as `0x${string}`, // Convert address to the correct format
    token: "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5", // Token address for TrotelCoin (TROTEL)
  });

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

        // If the data is still loading, return 0
        if (isLoading) return 0;

        // If there is an error, return 0
        if (isError) return 0;

        // Parse the balance value from the formatted data or default to 0
        const balance: number = parseFloat(data?.formatted as string) || 0;

        // Calculate the approximate USD value based on token balance and price
        const approxUSD: number = balance * response.raw.usdPrice;
        setApproxUSD(approxUSD);
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    // Call the fetchTokenInfo function when the component mounts
    fetchTokenInfo();
  }, []);

  // Render the approximate USD value with two decimal places
  return <span>{approxUSD.toFixed(2).toString()}</span>;
};

export default ApproxUSD;
