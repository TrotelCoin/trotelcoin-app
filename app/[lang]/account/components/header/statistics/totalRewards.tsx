import type { Lang } from "@/types/language/lang";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import CountUp from "react-countup";

const TotalRewards = ({ lang }: { lang: Lang }) => {
  const [tokensEarned, setTokensEarned] = useState<number | null>(null);

  const { address } = useAccount();

  const { data: totalRewardsPending } = useSWR(
    address ? `/api/user/rewards?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  useEffect(() => {
    if (totalRewardsPending) {
      setTokensEarned(totalRewardsPending);
    } else {
      setTokensEarned(0);
    }
  }, [totalRewardsPending, address]);

  return (
    <>
      <div
        className={`flex h-full items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <div className="mx-auto flex flex-col text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                <span>
                  <CountUp start={0} end={Math.floor(tokensEarned as number)} />
                </span>
              </span>
            </>
          </span>
          <span>{lang === "en" ? "Total rewards" : "Récompenses totales"}</span>
        </div>
      </div>
    </>
  );
};

export default TotalRewards;
