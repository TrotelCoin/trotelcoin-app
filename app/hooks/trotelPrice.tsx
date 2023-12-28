"use client";

import React, { useState, useEffect } from "react";

const TrotelPrice = () => {
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await fetch("/api/moralis/trotelPrice", {
          cache: "no-store",
        });
        const data = await response.json();
        if (!data.tokenPrice || data.tokenPrice === null) {
          setTokenPrice(0);
        } else {
          setTokenPrice(data.tokenPrice);
          setIsLoading(false);
        }
      } catch (error) {
        setError("Error fetching token price.");
        setTokenPrice(0);
        console.error("Error fetching token price:", error);
      }
    };

    fetchTokenPrice();
  }, []);

  useEffect(() => {
    error ? setTokenPrice(0) : null;
  }, [error]);

  return (
    <span className={`${isLoading && "animate-pulse"}`}>
      ${tokenPrice?.toFixed(5)}
    </span>
  );
};

export default TrotelPrice;
