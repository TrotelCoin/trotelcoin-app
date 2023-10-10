import React, { useState, useEffect } from "react";
import Moralis from "moralis";

export default function TrotelPriceChange() {
  const [tokenPriceChange, setTokenPriceChange] = useState<number>(0);
  const [containerClass, setContainerClass] = useState<string>(
    "inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20"
  );
  const [sign, setSign] = useState<string>("");

  const fetchTokenPriceChange = async () => {
    try {
      // Fetch token price change from Moralis EvmApi
      const response = await Moralis.EvmApi.token.getTokenPrice({
        chain: "0x38", // Binance Smart Chain
        include: "percent_change",
        address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5",
      });

      const priceChange = parseFloat(
        response.raw["24hrPercentChange"] as string
      );

      // Update the token price change state
      setTokenPriceChange(priceChange);

      // Update the container class and sign based on price change
      if (priceChange === 0) {
        setContainerClass(
          "inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20"
        );
        setSign("");
      } else if (priceChange < 0) {
        setContainerClass(
          "inline-flex items-center rounded-md bg-red-50 dark:bg-red-400/10 px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 ring-1 ring-inset ring-red-500/10 dark:ring-red-400/20"
        );
        setSign("");
      } else {
        setContainerClass(
          "inline-flex items-center rounded-md bg-green-50 dark:bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/10 dark:ring-green-500/20"
        );
        setSign("+");
      }

      // Cache the token price change
      localStorage.setItem("tokenPriceChange", String(priceChange));
    } catch (error) {
      console.error("Error fetching token price change:", error);
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to track component unmounting

    // Check if the token price change is already cached in localStorage
    const cachedTokenPriceChange = localStorage.getItem("tokenPriceChange");

    if (cachedTokenPriceChange) {
      const cachedPriceChange = parseFloat(cachedTokenPriceChange);
      setTokenPriceChange(cachedPriceChange);
    }

    // Fetch the token price change immediately
    fetchTokenPriceChange();

    // Set up a timer to fetch and update the token price change periodically
    const refreshInterval = setInterval(fetchTokenPriceChange, 300000); // Every 5 minutes

    return () => {
      // Cleanup function to set isMounted to false when unmounting
      isMounted = false;

      // Clear the timer when the component unmounts
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <span className={containerClass}>
      {`${sign}${tokenPriceChange.toFixed(2)}%`}
    </span>
  );
}
