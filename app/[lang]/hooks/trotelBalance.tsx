"use client";

import { useBalance, useBlockNumber } from "wagmi";
import React, { useEffect, useState } from "react";
import { polygon } from "wagmi/chains";
import { BalanceData } from "@/types/types";
import { trotelCoinAddress } from "@/data/web3/addresses";
import { useAccount } from "wagmi";

export default function TrotelBalance() {
  const [balance, setBalance] = useState<string>("0");

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data, isError, isLoading, refetch }: BalanceData = useBalance({
    address: address,
    token: trotelCoinAddress,
    chainId: polygon.id,
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, address]);

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
