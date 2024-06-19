"use client";

import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState, useContext } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import CountUp from "react-countup";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import { StatisticsType } from "@/types/statistics/statistics";
import TrotelPriceContext from "@/contexts/trotelPrice";

const stat: StatisticsType = "pending_trotelcoins";

const TrotelCoinsPending = ({
  lang,
  statsMap
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { storedTrotelPrice, showTrotelInUsdc } =
    useContext(TrotelPriceContext);

  const { data: trotelCoinsPending } = useSWR("/api/rewards", fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime
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
        className={`flex h-full flex-col items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <Evolution
          evolution={evolution as number}
          percentage={true}
          isLoading={!evolution}
        />
        <span className="text-2xl font-semibold md:text-4xl">
          {trotelCoinsPending && !showTrotelInUsdc && (
            <>
              <CountUp start={0} end={trotelCoinsPending} />{" "}
              <span className="hidden md:inline">💰</span>
            </>
          )}

          {trotelCoinsPending && showTrotelInUsdc && storedTrotelPrice ? (
            <>
              <CountUp
                start={0}
                prefix="$"
                decimals={2}
                end={trotelCoinsPending * storedTrotelPrice}
              />{" "}
              <span className="hidden md:inline">💰</span>
            </>
          ) : (
            showTrotelInUsdc && (
              <>
                <CountUp start={0} prefix="$" decimals={0} end={0} />{" "}
                <span className="hidden md:inline">💰</span>
              </>
            )
          )}
        </span>

        <span>{lang === "en" ? "Pending" : "En attente"}</span>
      </div>
    </>
  );
};

export default TrotelCoinsPending;
