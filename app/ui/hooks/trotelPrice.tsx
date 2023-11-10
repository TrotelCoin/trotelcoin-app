import React, { useState, useEffect } from "react";

const TrotelPrice = () => {
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [isError, setIsError] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await fetch("/api/moralis/trotelPrice", {
          cache: "no-store",
        });
        const data = await response.json();
        setTokenPrice(data.tokenPrice);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching token price:", error);
      }
    };

    fetchTokenPrice();
  }, []);

  return isError ? <span>$0.000</span> : <span>${tokenPrice?.toFixed(3)}</span>;
};

export default TrotelPrice;
