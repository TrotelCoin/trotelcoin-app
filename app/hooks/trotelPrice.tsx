import React, { useState, useEffect } from "react";

const TrotelPrice = () => {
  const [tokenPrice, setTokenPrice] = useState<number>(0);
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
        setTokenPrice(0);
        console.error("Error fetching token price:", error);
      }
    };

    fetchTokenPrice();
  }, []);

  useEffect(() => {
    error ? setTokenPrice(0) : tokenPrice;
  }, [error]);

  return <span>${tokenPrice?.toFixed(5)}</span>;
};

export default TrotelPrice;
