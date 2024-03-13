"use client";

import { Lang } from "@/types/types";
import { useBalance, useBlockNumber } from "wagmi";
import React, { use, useEffect, useState } from "react";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import { polygon } from "viem/chains";

const TotalStaked = ({ lang }: { lang: Lang }) => {
  const [totalStaked, setTotalStaked] = useState<number>(0);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: balance, refetch } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    address: trotelCoinStakingV1,
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  useEffect(() => {
    if (balance) {
      setTotalStaked(parseFloat(parseFloat(balance.formatted).toFixed(0)));
    }
  }, [balance]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex justify-between">
          <span>{lang === "en" ? "Total locked" : "Total verrouillé"}</span>
          <div>
            {totalStaked.toLocaleString("en-US")}{" "}
            <span className="font-semibold">TROTEL</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalStaked;
