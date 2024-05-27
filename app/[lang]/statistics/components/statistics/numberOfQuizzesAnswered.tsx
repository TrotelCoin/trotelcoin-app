"use client";

import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/style/loading";
import CountUp from "react-countup";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import { StatisticsType } from "@/types/statistics/statistics";

const stat: StatisticsType = "number_of_quizzes_answered";

const NumberOfQuizzesAnswered = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: numberOfQuizzesAnswered } = useSWR(
    "/api/quizzes/answered/count",
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
      numberOfQuizzesAnswered &&
      statsMap instanceof Map &&
      statsMap.has(stat)
    ) {
      updateStatistics(stat, numberOfQuizzesAnswered as number);
      updateEvolution(
        numberOfQuizzesAnswered as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [numberOfQuizzesAnswered, statsMap]);

  return (
    <>
      <div
        className={`bg-white flex flex-col h-full items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution evolution={evolution as number} percentage={true} />
        <span className="font-semibold text-2xl md:text-4xl">
          {numberOfQuizzesAnswered ? (
            <>
              <CountUp start={0} end={Math.floor(numberOfQuizzesAnswered)} />{" "}
              <span className="hidden md:inline">📚</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
              0 <span className="hidden md:inline">📚</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Quizzes answered" : "Quiz répondus"}</span>
      </div>
    </>
  );
};

export default NumberOfQuizzesAnswered;
