"use client";

import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import { trotelCoinExpertAddress } from "@/data/web3/addresses";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { polygon } from "viem/chains";
import { useReadContract, useBlockNumber } from "wagmi";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { updateEvolution, updateStatistics } from "@/lib/statistics/evolution";
import { StatisticsType } from "@/types/statistics/statistics";

const stat: StatisticsType = "expert";

const Expert = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: expert, refetch } = useReadContract({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "totalSupply",
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  useEffect(() => {
    if (expert && statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, expert as number);
      updateEvolution(
        expert as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [expert, statsMap]);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col h-full items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution evolution={evolution as number} percentage={true} />
        <span className="font-semibold text-2xl md:text-4xl">
          {expert ? (
            <>
              <CountUp start={0} end={Number(expert.toString())} />{" "}
              <span className="hidden md:inline">🦊</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
              0 <span className="hidden md:inline">🦊</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Expert" : "Expert"}</span>
      </div>
    </>
  );
};

export default Expert;
