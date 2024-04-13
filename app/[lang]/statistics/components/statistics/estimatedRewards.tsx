import type { Lang } from "@/types/lang";
import React from "react";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import CountUp from "react-countup";

const EstimatedRewards = ({ lang }: { lang: Lang }) => {
  const { data: remainingRewards } = useSWR(
    "/api/database/getRemainingRewards",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col h-full items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {remainingRewards ? (
            <>
              <CountUp start={0} end={Math.floor(remainingRewards / 10)} />{" "}
              {"< 🧠 <"}
              <CountUp start={0} end={Math.floor(remainingRewards / 4)} />
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>{"0 < 🧠 < 0"}</span>
          )}
        </span>

        <span>{lang === "en" ? "Rewards" : "Récompenses"}</span>
      </div>
    </>
  );
};

export default EstimatedRewards;
