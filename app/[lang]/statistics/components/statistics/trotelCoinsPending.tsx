"use client";

import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import CountUp from "react-countup";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import { StatisticsType } from "@/types/statistics/statistics";

const stat: StatisticsType = "pending_trotelcoins";

const TrotelCoinsPending = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: trotelCoinsPending } = useSWR("/api/rewards", fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime,
  });

  useEffect(() => {
    if (trotelCoinsPending && statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, trotelCoinsPending as number);
      updateEvolution(
        trotelCoinsPending as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [trotelCoinsPending, statsMap]);

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
          {trotelCoinsPending ? (
            <>
              <CountUp start={0} end={Math.floor(trotelCoinsPending)} />{" "}
              <span className="hidden md:inline">💰</span>
            </>
          ) : (
            <span>
              0 <span className="hidden md:inline">💰</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Pending" : "En attente"}</span>
      </div>
    </>
  );
};

export default TrotelCoinsPending;
