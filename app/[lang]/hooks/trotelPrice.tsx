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
          cache: "no-cache",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!data) {
          setTokenPrice(0);
        } else {
          setTokenPrice(data);
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
    <span className={`${isLoading && "animate__animated animate__flash animate__slower animate__infinite"}`}>
      ${tokenPrice?.toFixed(5)}
    </span>
  );
};

export default TrotelPrice;
