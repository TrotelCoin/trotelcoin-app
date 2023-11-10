import React, { useState, useEffect } from "react";

const TrotelPrice = () => {
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await fetch("/api/moralis/trotelPrice", {
          cache: "no-store",
        });
        const data = await response.json();
        setTokenPrice(data.tokenPrice);
      } catch (error) {
        setError("Error fetching token price.");
        console.error("Error fetching token price:", error);
      }
    };

    fetchTokenPrice();
  }, []);

  return error ? (
    <span className="animate-pulse">$0.000</span>
  ) : tokenPrice ? (
    <span>${tokenPrice?.toFixed(3)}</span>
  ) : (
    <span className="animate-pulse">$0.000</span>
  );
};

export default TrotelPrice;
