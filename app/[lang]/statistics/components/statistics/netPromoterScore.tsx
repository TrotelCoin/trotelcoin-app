"use client";

import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import CountUp from "react-countup";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { StatisticsType } from "@/types/statistics/statistics";

const stat: StatisticsType = "net_promoter_score";

const NetPromoterScore = ({
  lang,
  statsMap
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: netPromoterScore } = useSWR(
    "/api/satisfaction/net-promoter-score",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  useEffect(() => {
    if (netPromoterScore && statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, netPromoterScore);
      updateEvolution(
        netPromoterScore as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [netPromoterScore, statsMap]);

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
          {netPromoterScore ? (
            <>
              <CountUp start={0} end={netPromoterScore} />{" "}
              <span className="hidden md:inline">👍</span>
            </>
          ) : (
            <span>
              0 <span className="hidden md:inline">👍</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "NPS" : "NPS"}</span>
      </div>
    </>
  );
};

export default NetPromoterScore;
