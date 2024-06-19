import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import CountUp from "react-countup";
import TrotelPriceContext from "@/contexts/trotelPrice";

const EstimatedRewards = ({ lang }: { lang: Lang }) => {
  const { storedTrotelPrice, showTrotelInUsdc } =
    useContext(TrotelPriceContext);

  const { data: remainingRewards } = useSWR("/api/rewards/remaining", fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    refreshInterval: refreshIntervalTime
  });

  return (
    <>
      <div
        className={`flex h-full flex-col items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <span className="text-2xl font-semibold md:text-4xl">
          {remainingRewards && !showTrotelInUsdc && (
            <>
              <CountUp start={0} end={remainingRewards / 10} /> {"< 🧠 <"}
              <CountUp start={0} end={remainingRewards / 4} />
            </>
          )}

          {remainingRewards && showTrotelInUsdc && storedTrotelPrice ? (
            <>
              <CountUp
                start={0}
                prefix="$"
                end={(storedTrotelPrice * remainingRewards) / 7}
                decimals={3}
              />{" "}
              <span className="hidden md:inline">🧠</span>
            </>
          ) : (
            showTrotelInUsdc && (
              <>
                <CountUp start={0} prefix="$" end={0} />{" "}
                <span className="hidden md:inline">🧠</span>
              </>
            )
          )}
        </span>

        <span>{lang === "en" ? "Rewards" : "Récompenses"}</span>
      </div>
    </>
  );
};

export default EstimatedRewards;
