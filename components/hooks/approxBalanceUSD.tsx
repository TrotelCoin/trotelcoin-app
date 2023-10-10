import React, { useState, useEffect } from "react";
import TrotelBalanceNumber from "./trotelBalanceNumber";
import TrotelPrice from "./trotelPrice";

// Define a component named ApproxUSD
const ApproxUSD = () => {
  // Define state variables to store the token price and approximate USD value
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [approxUSD, setApproxUSD] = useState<number>(0);

  // Use the useEffect hook to fetch token information when the component mounts
  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Set the token price in state by calling the TrotelPrice function
        const price: string = TrotelPrice();
        setTokenPrice(parseFloat(price));

        // Get the token balance value by calling the TrotelBalanceNumber function
        const tokenBalanceValue: number = TrotelBalanceNumber();

        // Calculate the approximate USD value based on token balance and price
        const approxUSD: number = tokenBalanceValue * tokenPrice;
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
