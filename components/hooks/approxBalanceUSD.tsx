import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { useBalance, useAccount } from "wagmi";
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

  // Are we connected ?
  const { isConnected } = useAccount();

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

        // Check if the token price is already cached in localStorage
        const cachedTokenPrice = localStorage.getItem("tokenPrice");

        if (cachedTokenPrice) {
          const tokenPrice = parseFloat(cachedTokenPrice);
          setApproxUSD(tokenPrice * parseFloat(data?.formatted || "0"));
        } else {
          // Fetch token price from Moralis EvmApi
          const response = await Moralis.EvmApi.token.getTokenPrice({
            chain: "0x38", // Binance Smart Chain
            include: "percent_change",
            address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5", // TrotelCoin (TROTEL) token address
          });

          // Parse the balance value from the formatted data or default to 0
          const balance: number = parseFloat(data?.formatted as string) || 0;

          // Calculate the approximate USD value based on token balance and price
          const approxUSD: number = balance * response.raw.usdPrice;
          setApproxUSD(approxUSD);

          // Cache the token price in localStorage for future use
          localStorage.setItem("tokenPrice", String(response.raw.usdPrice));
        }
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    // Call the fetchTokenInfo function when the component mounts
    fetchTokenInfo();

    // Set up a timer to fetch and update the token price periodically (every 5 minutes)
    const refreshInterval = setInterval(fetchTokenInfo, 300000);

    // Clear the timer when the component unmounts
    return () => clearInterval(refreshInterval);
  }, []);

  // Render the approximate USD value with two decimal places
  if (isConnected) {
    return <span>{approxUSD.toFixed(2).toString()}</span>;
  } else {
    return <span className="animate-pulse">0.00</span>;
  }
};

export default ApproxUSD;
