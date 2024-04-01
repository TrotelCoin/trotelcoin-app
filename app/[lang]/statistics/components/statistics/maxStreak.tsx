"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import CountUp from "react-countup";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { updateEvolution, updateStatistics } from "@/lib/statistics/evolution";
import { StatisticsType } from "@/types/statistics/statistics";

const MaxStreak = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: maxStreak } = useSWR(
    "/api/database/getTotalMaxStreak",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (
      maxStreak &&
      statsMap instanceof Map &&
      statsMap.has("distributed_trotelcoins")
    ) {
      updateStatistics("max_streak", maxStreak as number);
      updateEvolution(
        maxStreak as number,
        "maxStreak",
        setEvolution,
        statsMap.get("max_streak") as number,
        true
      );
    }
  }, [maxStreak, statsMap]);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution evolution={evolution as number} percentage={true} />
        <span className="font-semibold text-2xl md:text-4xl">
          {maxStreak ? (
            <>
              <CountUp start={0} end={maxStreak} />{" "}
              <span className="hidden md:inline">🔥</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
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
