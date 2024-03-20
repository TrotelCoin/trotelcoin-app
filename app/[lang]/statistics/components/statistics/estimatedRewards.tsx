import type { Lang } from "@/types/lang";
import React from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const EstimatedRewards = ({ lang }: { lang: Lang }) => {
  const { data: remainingRewards } = useSWR(
    "/api/database/getRemainingRewards",
    fetcher
  );

  return (
    <>
      <div
        className={`bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {remainingRewards ? (
            <>
              {Math.floor(remainingRewards / 10).toLocaleString("en-US")}{" "}
              {"< 🧠 <"}
              {Math.floor(remainingRewards / 4).toLocaleString("en-US")}
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
