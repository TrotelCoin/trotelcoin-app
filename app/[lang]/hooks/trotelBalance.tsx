"use client";

import { useBalance } from "wagmi";
import React, { useEffect, useState } from "react";
import { polygon } from "wagmi/chains";
import { BalanceData } from "@/types/types";
import { trotelCoinAddress } from "@/data/web3/addresses";
import { useAccount } from "wagmi";

export default function TrotelBalance() {
  const [balance, setBalance] = useState("0");

  const { address}  = useAccount();

  const { data, isError, isLoading }: BalanceData = useBalance({
    address: address as `0x${string}`,
    enabled: Boolean(address),
    token: trotelCoinAddress,
    chainId: polygon.id,
    watch: true,
  });

  useEffect(() => {
    if (isLoading) {
      setBalance("0");
    }

    if (isError) {
      setBalance("0");
    }

    if (!address) {
      setBalance("0");
    }
  }, [isLoading, isError, address]);

  useEffect(() => {
    if (data?.formatted) {
      setBalance(data?.formatted);
    }
  }, [data]);

  return <>{parseFloat(balance).toFixed(0)}</>;
}
