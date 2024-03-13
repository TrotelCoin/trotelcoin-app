import { Lang } from "@/types/types";
import { useAccount } from "wagmi";
import React from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";

const TotalRewardsPending = ({ lang }: { lang: Lang }) => {
  const { address}  = useAccount();

  const { data: totalRewardsPending } = useSWR(
    `/api/database/getUserTotalRewardsPending?wallet=${address}`,
    fetcher
  );

  return (
    <>
      <div
        className={`bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {totalRewardsPending ? (
                  <span>
                    {Math.floor(totalRewardsPending)?.toLocaleString("en-US") ??
                      0}
                  </span>
                ) : (
                  <span className="animate__animated animate__flash animate__slower animate__infinite">
                    0
                  </span>
                )}
              </span>
            </>
          </span>
          <span>
            {lang === "en" ? "Rewards pending" : "Récompenses en attente"}
          </span>
        </div>
      </div>
    </>
  );
};

export default TotalRewardsPending;
