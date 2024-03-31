import type { Lang } from "@/types/lang";
import { useAccount } from "wagmi";
import React from "react";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import CountUp from "react-countup";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const TotalRewardsPending = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { data: totalRewardsPending } = useSWR(
    `/api/database/getUserTotalRewardsPending?wallet=${address}`,
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
        className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {totalRewardsPending ? (
                  <span>
                    <CountUp
                      start={0}
                      end={Math.floor(totalRewardsPending) ?? 0}
                    />
                  </span>
                ) : (
                  <span className={`${loadingFlashClass}`}>0</span>
                )}
              </span>
            </>
          </span>
          <span>{lang === "en" ? "To claim" : "À réclamer"}</span>
        </div>
      </div>
    </>
  );
};

export default TotalRewardsPending;
