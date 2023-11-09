import React, { useState, useEffect } from "react";

const TrotelPrice = () => {
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await fetch("/api/moralis/trotelPrice");
        const data = await response.json();
        setTokenPrice(data.tokenPrice);
        localStorage.setItem("tokenPrice", String(data.tokenPrice));
      } catch (error) {
        console.error("Error fetching token price:", error);
      }
    };

    fetchTokenPrice();

    const refreshInterval = setInterval(fetchTokenPrice, 300000);

    return () => clearInterval(refreshInterval);
  }, []);

  return tokenPrice !== null ? (
    <span>{tokenPrice.toFixed(3)}</span>
  ) : (
    <span className="animate-pulse">0.000</span>
  );
};

export default TrotelPrice;
