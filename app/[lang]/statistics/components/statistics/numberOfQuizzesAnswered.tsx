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

const NumberOfQuizzesAnswered = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: numberOfQuizzesAnswered } = useSWR(
    "/api/database/getTotalNumberOfQuizzesAnswered",
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
      statsMap.has("distributed_trotelcoins")
    ) {
      updateStatistics(
        "number_of_quizzes_answered",
        numberOfQuizzesAnswered as number
      );
      updateEvolution(
        numberOfQuizzesAnswered as number,
        "numberOfQuizzesAnswered",
        setEvolution,
        statsMap.get("number_of_quizzes_answered") as number,
        true
      );
    }
  }, [numberOfQuizzesAnswered, statsMap]);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
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
