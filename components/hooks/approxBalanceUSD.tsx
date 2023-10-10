import React, { useState, useEffect } from "react";
import TrotelBalanceNumber from "./trotelBalanceNumber";
import TrotelPrice from "./trotelPrice";

const ApproxUSD = () => {
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [approxUSD, setApproxUSD] = useState<number>(0);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // Set the token price in state
        const price: string = TrotelPrice();
        setTokenPrice(parseFloat(price));

        const tokenBalanceValue: number = TrotelBalanceNumber();

        const approxUSD: number = tokenBalanceValue * tokenPrice;
        setApproxUSD(approxUSD);
      } catch (error) {
        console.error("Error fetching token information:", error);
      }
    };

    fetchTokenInfo();
  }, []);

  return <span>{approxUSD.toFixed(2).toString()}</span>;
};

export default ApproxUSD;
