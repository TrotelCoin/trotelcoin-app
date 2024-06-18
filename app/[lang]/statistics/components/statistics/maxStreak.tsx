"use client";

import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import CountUp from "react-countup";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import { StatisticsType } from "@/types/statistics/statistics";

const stat: StatisticsType = "max_streak";

const MaxStreak = ({
  lang,
  statsMap
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: maxStreak } = useSWR("/api/streak/max-streak", fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime
  });

  useEffect(() => {
    if (maxStreak && statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, maxStreak as number);
      updateEvolution(
        maxStreak as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [maxStreak, statsMap]);

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
          {maxStreak ? (
            <>
              <CountUp start={0} end={maxStreak} />{" "}
              <span className="hidden md:inline">🔥</span>
            </>
          ) : (
            <span>
              0 <span className="hidden md:inline">🔥</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Max streak" : "Série maximale"}</span>
      </div>
    </>
  );
};

export default MaxStreak;
