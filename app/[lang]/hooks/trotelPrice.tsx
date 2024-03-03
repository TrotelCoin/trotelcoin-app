"use client";

import React from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";

const TrotelPrice = () => {
  const { data, isLoading } = useSWR("/api/moralis/trotelPrice", fetcher);

  return (
    <span
      className={`${
        isLoading &&
        "animate__animated animate__flash animate__slower animate__infinite"
      }`}
    >
      ${data ? data.toFixed(5) : "0.00000"}
    </span>
  );
};

export default TrotelPrice;
