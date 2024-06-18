"use client";

import trotelCoinEarlyABI from "@/abi/premium/trotelCoinEarly";
import { trotelCoinEarlyAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { polygon } from "viem/chains";
import { useReadContract, useBlockNumber } from "wagmi";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { StatisticsType } from "@/types/statistics/statistics";

const stat: StatisticsType = "early";

const Early = ({
  lang,
  statsMap
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id
  });

  const { data: early, refetch } = useReadContract({
    chainId: polygon.id,
    address: trotelCoinEarlyAddress,
    abi: trotelCoinEarlyABI,
    functionName: "totalSupply"
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  useEffect(() => {
    if (early && statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, early as number);
      updateEvolution(
        early as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [early, statsMap]);

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
          {early ? (
            <>
              <CountUp start={0} end={Number(early.toString())} />{" "}
              <span className="hidden md:inline">🤫</span>
            </>
          ) : (
            <span>
              0 <span className="hidden md:inline">🤫</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Early access" : "Accès anticipé"}</span>
      </div>
    </>
  );
};

export default Early;
