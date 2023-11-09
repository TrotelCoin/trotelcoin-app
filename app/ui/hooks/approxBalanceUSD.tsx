"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { Hash } from "viem";

const ApproxUSD = () => {
  const [approxUSD, setApproxUSD] = useState<number>(0);

  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address: address as Hash });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/approxUSD?balance=${parseFloat(balance?.formatted as string)}`
        );
        const data = await response.json();
        setApproxUSD(data.approxUSD);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();

    // Fetch and update data periodically (every 5 minutes)
    const refreshInterval = setInterval(fetchData, 300000);

    // Clear the interval when the component unmounts
    return () => clearInterval(refreshInterval);
  }, [address, balance?.formatted]);

  if (isConnected) {
    return <span>{approxUSD.toFixed(2).toString()}</span>;
  } else {
    return <span className="animate-pulse">0.00</span>;
  }
};

export default ApproxUSD;
