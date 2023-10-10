import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import ApexCharts from "react-apexcharts";

export default function TrotelPriceChart() {
  // State to hold the token price
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);

  useEffect(() => {
    // Function to fetch token information from Moralis
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

        // Set the token price in state
        setTokenPrice(response.raw.usdPrice);

        // Cache the token price in localStorage for future use
        localStorage.setItem("tokenPrice", String(response.raw.usdPrice));

        // Store the current price in the price history array
        setPriceHistory((prevHistory) => [
          ...prevHistory,
          response.raw.usdPrice,
        ]);
      } catch (e) {
        console.error(e);
      }
    };

    // Call the fetchTokenInfo function when the component mounts
    fetchTokenInfo();

    // Set up a timer to fetch and update the token price periodically
    const refreshInterval = setInterval(fetchTokenInfo, 300000); // Every 5 minutes

    // Clear the timer when the component unmounts
    return () => clearInterval(refreshInterval);
  }, []);

  // Define the ApexCharts configuration options
  const chartOptions = {
    chart: {
      id: "price-chart",
    },
    xaxis: {
      type: "datetime",
      categories: priceHistory.map((_, index) =>
        new Date(
          new Date().getTime() - (7 - index) * 24 * 60 * 60 * 1000
        ).getTime()
      ),
    },
    yaxis: {
      title: {
        text: "Price (USD)",
      },
    },
  };

  // Define the ApexCharts series data
  const chartSeries = [
    {
      name: "Trotel Price (USD)",
      data: priceHistory,
    },
  ];

  // Return the component with the ApexCharts container
  return (
    <div>
      {tokenPrice !== null ? (
        <ApexCharts
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={400}
        />
      ) : (
        <span className="animate-pulse">0.000</span>
      )}
    </div>
  );
}
