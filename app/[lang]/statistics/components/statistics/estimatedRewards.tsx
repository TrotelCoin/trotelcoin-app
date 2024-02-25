import { DictType } from "@/types/types";
import React, { useEffect, useState } from "react";

const EstimatedRewards = ({ dict }: { dict: DictType }) => {
  const [remainingRewards, setRemainingRewards] = useState<number | null>(null);

  useEffect(() => {
    const fetchRemainingRewards = async () => {
      const response = await fetch("/api/database/remainingRewards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      });
      const remainingRewards = await response?.json();
      if (remainingRewards) {
        setRemainingRewards(remainingRewards);
      } else {
        setRemainingRewards(0);
      }
    };

    fetchRemainingRewards();

    const interval = setInterval(fetchRemainingRewards, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {remainingRewards ? (
            <>
              {Math.floor(remainingRewards / 10).toLocaleString("en-US")}{" "}
              {"< 🧠 <"}
              {Math.floor(remainingRewards / 4).toLocaleString("en-US")}
            </>
          ) : (
            <span className="animate__animated animate__flash animate__slower animate__infinite">
              {"0 < 🧠 < 0"}
            </span>
          )}
        </span>

        <span>
          {typeof dict?.algorithm !== "string" && (
            <>{dict?.algorithm.remainingTokens}</>
          )}
        </span>
      </div>
    </>
  );
};

export default EstimatedRewards;
