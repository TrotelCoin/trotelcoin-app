"use client";

import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/lang";
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import React, { useEffect, useState } from "react";
import { polygon } from "viem/chains";
import { Address } from "viem";

const Balance = ({ lang }: { lang: Lang }) => {
  const [balance, setBalance] = useState<number | null>(null);

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data, refetch: refetchBalance } = useBalance({
    token: trotelCoinAddress,
    chainId: polygon.id,
    address: address as Address,
  });

  useEffect(() => {
    refetchBalance();
  }, [blockNumber, address]);

  useEffect(() => {
    if (data) {
      setBalance(parseFloat(data.formatted));
    } else {
      setBalance(0);
    }
  }, [data]);

  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Balance" : "Solde"}</span>
        <div>
          {parseFloat(balance?.toFixed(0) as string).toLocaleString("en-US") ??
            "0"}{" "}
          <span className="font-semibold">TROTEL</span>
        </div>
      </div>
    </>
  );
};

export default Balance;
