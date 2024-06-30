"use client";

import contracts from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import React, { useContext, useEffect, useState } from "react";
import { Address } from "viem";
import { Skeleton } from "@radix-ui/themes";
import ChainContext from "@/contexts/chain";

const Balance = ({ lang }: { lang: Lang }) => {
  const [balance, setBalance] = useState<number | null>(null);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const {
    data,
    refetch: refetchBalance,
    isLoading: isLoadingBalance
  } = useBalance({
    token: contracts[chain.id].trotelCoinAddress,
    chainId: chain.id,
    address: address as Address
  });

  useEffect(() => {
    refetchBalance();
  }, [blockNumber, address, refetchBalance]);

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
        <Skeleton loading={isLoadingBalance}>
          <div>
            {parseFloat(balance?.toFixed(0) as string).toLocaleString(
              "en-US"
            ) ?? "0"}{" "}
            TROTEL
          </div>{" "}
        </Skeleton>
      </div>
    </>
  );
};

export default Balance;
