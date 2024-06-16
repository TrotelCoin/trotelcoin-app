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
import { Skeleton } from "@radix-ui/themes";

const stat: StatisticsType = "average_mark";

const AverageMark = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: averageMark } = useSWR("/api/marks/average-mark", fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime,
  });

  useEffect(() => {
    if (averageMark && statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, averageMark as number);
      updateEvolution(
        averageMark as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [averageMark, statsMap]);

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
          {averageMark ? (
            <>
              <CountUp start={0} end={averageMark} suffix="/20" />{" "}
              <span className="hidden md:inline">🎓</span>
            </>
          ) : (
            <span>
              <Skeleton>
                0/20 <span className="hidden md:inline">🎓</span>
              </Skeleton>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Average mark" : "Note moyenne"}</span>
      </div>
    </>
  );
};

export default AverageMark;
