"use client";

import trotelCoinEarlyABI from "@/abi/premium/trotelCoinEarly";
import { trotelCoinEarlyAddress } from "@/data/web3/addresses";
import { Skeleton } from "@radix-ui/themes";
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

  const { data: early, refetch } = useReadContract({
    chainId: polygon.id,
    address: trotelCoinEarlyAddress,
    abi: trotelCoinEarlyABI,
    functionName: "totalSupply",
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

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
        className={`bg-white flex flex-col h-full items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution
          evolution={evolution as number}
          percentage={true}
          isLoading={!evolution}
        />
        <span className="font-semibold text-2xl md:text-4xl">
          {early ? (
            <>
              <CountUp start={0} end={Number(early.toString())} />{" "}
              <span className="hidden md:inline">🤫</span>
            </>
          ) : (
            <span>
              <Skeleton>
                0 <span className="hidden md:inline">🤫</span>
              </Skeleton>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Early access" : "Accès anticipé"}</span>
      </div>
    </>
  );
};

export default Early;
