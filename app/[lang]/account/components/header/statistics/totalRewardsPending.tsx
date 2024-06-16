import type { Lang } from "@/types/language/lang";
import { useAccount } from "wagmi";
import React from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import CountUp from "react-countup";
import useSWR from "swr";
import { Skeleton } from "@radix-ui/themes";

const TotalRewardsPending = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { data: totalRewardsPending } = useSWR(
    `/api/user/rewards?wallet=${address}`,
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
        className={`bg-white h-full flex items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
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
                      suffix=" 💰"
                    />
                  </span>
                ) : (
                  <span>
                    <span><Skeleton>0</Skeleton></span> 💰
                  </span>
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
