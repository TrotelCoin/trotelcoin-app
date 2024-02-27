"use client";

import React, { useState, useEffect } from "react";

const TrotelPriceChange = () => {
  const [tokenPriceChange, setTokenPriceChange] = useState<number>(0);
  const [containerClass, setContainerClass] = useState<string>(
    "inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-300/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-500/20 dark:ring-gray-200/40"
  );
  const [sign, setSign] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadingClass, setLoadingClass] = useState<string>("");

  useEffect(() => {
    const fetchTokenPriceChange = async () => {
      try {
        const response = await fetch("/api/moralis/trotelPriceChange", {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          method: "GET",
        });
        const data = await response.json();

        if (data) {
          const priceChange = parseFloat(data);

          setTokenPriceChange(priceChange);

          if (priceChange === 0) {
            setContainerClass(
              "inline-flex items-center rounded-lg bg-gray-100 dark:bg-gray-300/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-500/20 dark:ring-gray-200/40"
            );
            setLoadingClass("");
            setSign("");
          } else if (priceChange < 0) {
            setContainerClass(
              "inline-flex items-center rounded-lg bg-red-50 dark:bg-red-300/10 px-2 py-1 text-xs font-medium text-red-500 dark:text-red-300 ring-1 ring-inset ring-red-500/20 dark:ring-red-300/40"
            );
            setLoadingClass("");
            setSign("");
          } else if (priceChange > 0) {
            setContainerClass(
              "inline-flex items-center rounded-lg bg-green-50 dark:bg-green-300/10 px-2 py-1 text-xs font-medium text-green-500 dark:text-green-300 ring-1 ring-inset ring-green-500/20 dark:ring-green-300/40"
            );
            setLoadingClass("");
            setSign("+");
          } else {
            setTokenPriceChange(0);
            setContainerClass(
              "inline-flex items-center rounded-lg bg-gray-100 dark:bg-gray-300/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-500/20 dark:ring-gray-200/40"
            );
            setLoadingClass(
              "animate__animated animate__flash animate__slower animate__infinite"
            );
            setSign("");
          }
        }
      } catch (error) {
        setError("Error fetching token price change.");
        setTokenPriceChange(0);
        console.error("Error fetching token price change:", error);
      }
    };

    fetchTokenPriceChange();
  }, []);

  useEffect(() => {
    error ? setTokenPriceChange(0) : null;
  }, [error]);

  return (
    <span className={containerClass}>
      <span className={loadingClass}>{`${sign}${tokenPriceChange.toFixed(
        2
      )}%`}</span>
    </span>
  );
};

export default TrotelPriceChange;
