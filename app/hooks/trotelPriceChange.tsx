import React, { useState, useEffect } from "react";

const TrotelPriceChange = () => {
  const [tokenPriceChange, setTokenPriceChange] = useState<number>(0);
  const [containerClass, setContainerClass] = useState<string>(
    "inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-200/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-200 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-200/20"
  );
  const [sign, setSign] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTokenPriceChange = async () => {
      try {
        const response = await fetch("/api/moralis/trotelPriceChange", {
          cache: "no-store",
        });
        const data = await response.json();

        const priceChange = parseFloat(data.priceChange);
        setTokenPriceChange(priceChange);

        if (priceChange === 0) {
          setContainerClass(
            "inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-200/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-200 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-200/20"
          );
          setSign("");
        } else if (priceChange < 0) {
          setContainerClass(
            "inline-flex items-center rounded-md bg-red-50 dark:bg-red-200/10 px-2 py-1 text-xs font-medium text-red-600 dark:text-red-200 ring-1 ring-inset ring-red-500/10 dark:ring-red-200/20"
          );
          setSign("");
        } else {
          setContainerClass(
            "inline-flex items-center rounded-md bg-green-50 dark:bg-green-300/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-200 ring-1 ring-inset ring-green-500/10 dark:ring-green-300/20"
          );
          setSign("+");
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
    <span className={containerClass}>{`${sign}${tokenPriceChange.toFixed(
      2
    )}%`}</span>
  );
};

export default TrotelPriceChange;
