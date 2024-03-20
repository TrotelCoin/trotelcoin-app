"use client";

import React, { useState, useEffect } from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const TrotelPriceChange = () => {
  const [tokenPriceChange, setTokenPriceChange] = useState<number>(0);
  const [containerClass, setContainerClass] = useState<string>(
    "inline-flex items-center rounded-xl bg-gray-500 px-2 py-1 text-xs font-medium text-gray-100"
  );
  const [sign, setSign] = useState<string>("");
  const [loadingClass, setLoadingClass] = useState<string>("");

  const { data, isLoading } = useSWR("/api/moralis/trotelPriceChange", fetcher);

  useEffect(() => {
    if (data) {
      const priceChange = parseFloat(data);

      setTokenPriceChange(priceChange);

      if (priceChange === 0) {
        setContainerClass(
          "inline-flex items-center rounded-xl bg-gray-500 px-2 py-1 text-xs font-medium text-gray-100"
        );
        setLoadingClass("");
        setSign("");
      } else if (priceChange < 0) {
        setContainerClass(
          "inline-flex items-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium text-gray-100"
        );
        setLoadingClass("");
        setSign("");
      } else if (priceChange > 0) {
        setContainerClass(
          "inline-flex items-center rounded-xl bg-green-400 px-2 py-1 text-xs font-medium text-gray-100"
        );
        setLoadingClass("");
        setSign("+");
      } else {
        setTokenPriceChange(0);
        setContainerClass(
          "inline-flex items-center rounded-xl bg-gray-500 px-2 py-1 text-xs font-medium text-gray-100"
        );
        setLoadingClass(loadingFlashClass);
        setSign("");
      }
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setTokenPriceChange(0);
      setContainerClass(
        "inline-flex items-center rounded-xl bg-gray-500 px-2 py-1 text-xs font-medium text-gray-100"
      );
      setLoadingClass(loadingFlashClass);
      setSign("");
    }
  }, [isLoading]);

  return (
    <span className={containerClass}>
      <span className={loadingClass}>{`${sign}${tokenPriceChange.toFixed(
        2
      )}%`}</span>
    </span>
  );
};

export default TrotelPriceChange;
