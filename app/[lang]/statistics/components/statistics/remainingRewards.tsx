import { Lang } from "@/types/lang";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/axios/fetcher";

const RemainingRewards = ({ lang }: { lang: Lang }) => {
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
              {Math.floor(remainingRewards).toLocaleString("en-US")}{" "}
              <span className="hidden md:inline">⏳</span>
            </>
          ) : (
            <span className="animate__animated animate__flash animate__slower animate__infinite">
              0 <span className="hidden md:inline">⏳</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Current cycle" : "Cycle en cours"}</span>
      </div>
    </>
  );
};

export default RemainingRewards;
