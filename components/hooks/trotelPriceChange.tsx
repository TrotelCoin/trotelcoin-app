import React, { useState, useEffect } from "react";
import Moralis from "moralis";

export default function TrotelPriceChange() {
  // State to hold the token price change percentage
  const [tokenPriceChange, setTokenPriceChange] = useState<number | null>(null);

  // State to manage the CSS classes for the container element
  const [containerClass, setContainerClass] = useState(
    "inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20"
  );

  // State to hold the sign (+ or -) for the price change
  const [sign, setSign] = useState("");

  useEffect(() => {
    // Function to fetch token information from Moralis
    const fetchTokenInfo = async () => {
      try {
        // Initialize Moralis with the API key
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

        // Extract the price change percentage and parse it as a float
        const priceChange = parseFloat(
          response.raw["24hrPercentChange"] as string
        );

        // Set the token price change in state
        setTokenPriceChange(priceChange);

        // Determine the sign and update CSS classes accordingly
        if ((tokenPriceChange as number) === 0) {
          setContainerClass(
            "inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20"
          );
          setSign("");
        } else if ((tokenPriceChange as number) < 0) {
          setContainerClass(
            "inline-flex items-center rounded-md bg-red-50 dark:bg-red-400/10 px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 ring-1 ring-inset ring-red-500/10 dark:ring-red-400/20"
          );
          setSign("-");
        } else {
          setContainerClass(
            "inline-flex items-center rounded-md bg-green-50 dark:bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/10 dark:ring-green-500/20"
          );
          setSign("+");
        }
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    // Call the fetchTokenInfo function when the component mounts
    fetchTokenInfo();
  }, []);

  return (
    // Display the token price change percentage with the determined CSS class
    <span className={containerClass}>
      {tokenPriceChange !== null
        ? `${sign}${tokenPriceChange.toFixed(2)}%`
        : "0"}
    </span>
  );
}
