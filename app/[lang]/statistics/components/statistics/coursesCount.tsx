"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/utils/tailwind/loading";
import CountUp from "react-countup";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { updateEvolution, updateStatistics } from "@/utils/statistics/evolution";
import { StatisticsType } from "@/types/statistics/statistics";

const stat: StatisticsType = "courses_count";

const CoursesCount = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: coursesCount } = useSWR("/api/courses/count", fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime,
  });

  useEffect(() => {
    if (coursesCount && statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, coursesCount);
      updateEvolution(
        coursesCount as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [coursesCount, statsMap]);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col h-full items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution evolution={evolution as number} percentage={true} />
        <span className="font-semibold text-2xl md:text-4xl">
          {coursesCount ? (
            <>
              <CountUp start={0} end={coursesCount} />{" "}
              <span className="hidden md:inline">📖</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
              0 <span className="hidden md:inline">📖</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Courses" : "Cours"}</span>
      </div>
    </>
  );
};

export default CoursesCount;
