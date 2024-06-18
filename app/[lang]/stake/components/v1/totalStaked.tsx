"use client";

import type { Lang } from "@/types/language/lang";
import { useBalance, useBlockNumber } from "wagmi";
import React, { useEffect, useState } from "react";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import { polygon } from "viem/chains";
import CountUp from "react-countup";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import { Skeleton } from "@radix-ui/themes";

const TotalStaked = ({
  lang,
  storedTrotelPrice,
  roundPrice
}: {
  lang: Lang;
  storedTrotelPrice: number;
  roundPrice: () => void;
}) => {
  const [totalStaked, setTotalStaked] = useState<number | null>(null);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id
  });

  const { data: balance, refetch } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    address: trotelCoinStakingV1
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

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
          <div className="flex items-center gap-1">
            <Skeleton loading={!totalStaked}>
              <CountUp start={0} end={totalStaked ?? 0} />
              <TrotelCoinLogo />
            </Skeleton>
          </div>
        </div>

        <div className="flex justify-between">
          <span>{lang === "en" ? "TVL" : "TVL"}</span>
          <div className="flex items-center gap-1">
            <Skeleton loading={!trotelPrice || !totalStaked}>
              {storedTrotelPrice && totalStaked ? (
                <CountUp
                  start={0}
                  prefix="$"
                  end={storedTrotelPrice * totalStaked}
                />
              ) : (
                <CountUp start={0} end={0} />
              )}

              <TrotelCoinLogo />
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalStaked;
