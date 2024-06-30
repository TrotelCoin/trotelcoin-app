"use client";

import abis from "@/abis/abis";
import contracts from "@/data/web3/addresses";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import type { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useReadContract, useBlockNumber } from "wagmi";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { StatisticsType } from "@/types/statistics/statistics";
import ChainContext from "@/contexts/chain";

const stat: StatisticsType = "intermediate";

const Intermediate = ({
  lang,
  statsMap
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { data: intermediate, refetch } = useReadContract({
    chainId: chain.id,
    address: contracts[chain.id].trotelCoinIntermediateAddress,
    abi: abis[chain.id].trotelCoinIntermediate,
    functionName: "totalSupply"
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  useEffect(() => {
    if (intermediate && statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, intermediate as number);
      updateEvolution(
        intermediate as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [intermediate, statsMap]);

  return (
    <>
      <div
        className={`flex h-full flex-col items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <Evolution
          evolution={evolution as number}
          percentage={true}
          isLoading={!evolution}
        />
        <span className="text-2xl font-semibold md:text-4xl">
          <CountUp start={0} end={Number(intermediate as number)} />{" "}
          <span className="hidden md:inline">🙈</span>
        </span>

        <span>{lang === "en" ? "Intermediate" : "Intermédiaire"}</span>
      </div>
    </>
  );
};

export default Intermediate;
