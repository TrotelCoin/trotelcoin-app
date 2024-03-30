"use client";

import React from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const TrotelPrice = () => {
  const { data, isLoading } = useSWR("/api/moralis/trotelPrice", fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: 3600000,
  });

  return (
    <span className={`${isLoading && loadingFlashClass}`}>
      ${data ? data.toFixed(5) : "0.00000"}
    </span>
  );
};

export default TrotelPrice;
