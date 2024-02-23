"use client";

import { Lang } from "@/types/types";
import { useTokenBalance, useContract } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import { Address } from "viem";

const TotalStaked = ({ lang }: { lang: Lang }) => {
  const [totalStaked, setTotalStaked] = useState<number>(0);

  const { contract } = useContract(trotelCoinAddress, "token");

  const { data: balance } = useTokenBalance(contract, trotelCoinStakingV1);

  useEffect(() => {
    if (balance) {
      setTotalStaked(parseFloat(parseFloat(balance.displayValue).toFixed(0)));
    }
  }, [balance]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex justify-between">
          <span>{lang === "en" ? "Total locked" : "Total verrouillé"}</span>
          <div>
            {totalStaked} <span className="font-semibold">TROTEL</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalStaked;
