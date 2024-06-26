"use client";

import type { Lang } from "@/types/language/lang";
import { useBalance, useBlockNumber } from "wagmi";
import React, { useContext, useEffect, useState } from "react";
import { getContractAddress } from "@/data/web3/addresses";
import CountUp from "react-countup";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import { Skeleton } from "@radix-ui/themes";
import ChainContext from "@/contexts/chain";

const TotalStaked = ({
  lang,
  storedTrotelPrice
}: {
  lang: Lang;
  storedTrotelPrice: number;
}) => {
  const [totalStaked, setTotalStaked] = useState<number | null>(null);

  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const {
    data: balance,
    refetch,
    isLoading: isLoadingTotalStaked
  } = useBalance({
    chainId: chain.id,
    token: getContractAddress(chain.id, "trotelCoinAddress"),
    address: getContractAddress(chain.id, "trotelCoinStakingV2")
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  useEffect(() => {
    if (balance) {
      const balanceFinal = Math.floor(Number(balance.formatted));
      setTotalStaked(balanceFinal);
    }
  }, [balance]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex justify-between">
          <span>{lang === "en" ? "Total locked" : "Total verrouillé"}</span>
          <div className="flex items-center gap-1">
            <Skeleton loading={isLoadingTotalStaked}>
              <CountUp start={0} end={totalStaked as number} />
              <TrotelCoinLogo />
            </Skeleton>
          </div>
        </div>

        <div className="flex justify-between">
          <span>{lang === "en" ? "TVL" : "TVL"}</span>
          <div className="flex items-center gap-1">
            <Skeleton loading={!storedTrotelPrice || isLoadingTotalStaked}>
              <CountUp
                start={0}
                prefix="$"
                end={storedTrotelPrice * (totalStaked as number)}
              />
              <TrotelCoinLogo />
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalStaked;
