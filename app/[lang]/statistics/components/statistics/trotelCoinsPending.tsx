"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import CountUp from "react-countup";
import { updateEvolution } from "@/lib/statistics/evolution";
import { updateStatistics } from "@/lib/statistics/evolution";
import { StatisticsType } from "@/types/statistics/statistics";

const TrotelCoinsPending = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: trotelCoinsPending } = useSWR(
    "/api/database/getTotalTrotelCoinsPending",
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
      trotelCoinsPending &&
      statsMap instanceof Map &&
      statsMap.has("distributed_trotelcoins")
    ) {
      updateStatistics("pending_trotelcoins", trotelCoinsPending as number);
      updateEvolution(
        trotelCoinsPending as number,
        "trotelCoinsPending",
        setEvolution,
        statsMap.get("pending_trotelcoins") as number,
        true
      );
    }
  }, [trotelCoinsPending, statsMap]);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution evolution={evolution as number} percentage={true} />
        <span className="font-semibold text-2xl md:text-4xl">
          {trotelCoinsPending ? (
            <>
              <CountUp start={0} end={Math.floor(trotelCoinsPending)} />{" "}
              <span className="hidden md:inline">💰</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
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
