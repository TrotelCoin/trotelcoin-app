import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import echarts from "echarts";

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

  // Render the ECharts chart with the historical price data
  useEffect(() => {
    if (priceHistory.length > 0) {
      const chartContainer = document.getElementById("echarts-container");
      if (chartContainer) {
        const chart = echarts.init(chartContainer);
        chart.setOption({
          title: {
            text: "Trotel Price Chart (7 Days)",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
          },
          xAxis: {
            type: "category",
            data: priceHistory.map((_, index) => `Day ${index + 1}`),
          },
          yAxis: {
            type: "value",
            name: "Price (USD)",
          },
          series: [
            {
              data: priceHistory,
              type: "line",
            },
          ],
        });
      }
    }
  }, [priceHistory]);

  // Return the component with the ECharts container
  return (
    <div>
      {tokenPrice !== null ? (
        <div
          id="echarts-container"
          style={{ width: "100%", height: "400px" }}
        ></div>
      ) : (
        <span className="animate-pulse">0.000</span>
      )}
    </div>
  );
}
