import type { Lang } from "@/types/lang";
import React from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import CountUp from "react-countup";

const TrotelCoinsPending = ({ lang }: { lang: Lang }) => {
  const { data: trotelCoinsPending } = useSWR(
    "/api/database/getTotalTrotelCoinsPending",
    fetcher
  );

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
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

        <span>
          {lang === "en" ? "pending TrotelCoins" : "TrotelCoins en attente"}
        </span>
      </div>
    </>
  );
};

export default TrotelCoinsPending;
