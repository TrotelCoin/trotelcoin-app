import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import type { Lang } from "@/types/lang";
import React from "react";
import CountUp from "react-countup";
import useSWR from "swr";
import { useAccount } from "wagmi";

const LearningTime = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { data: learningTime } = useSWR(
    `/api/database/getUserQuizzesTime?wallet=${address}`,
    fetcher,
    {
      refreshInterval: refreshIntervalTime,
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );

  return (
    <>
      <div
        className={`bg-gray-50 h-full flex items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {learningTime ? (
                  <span>
                    <CountUp
                      start={0}
                      end={Math.floor((learningTime * 1e-3) / 60)}
                      suffix="m ⏳"
                    />
                  </span>
                ) : (
                  <span>
                    <span className={`${loadingFlashClass}`}>0</span>m ⏳
                  </span>
                )}
              </span>
            </>
          </span>
          <span>
            {lang === "en" ? "Learning time" : "Temps d'apprentissage"}
          </span>
        </div>
      </div>
    </>
  );
};

export default LearningTime;
