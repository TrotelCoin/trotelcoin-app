import { DictType } from "@/types/types";
import React, { useEffect, useState } from "react";

const RemainingRewards = ({ dict }: { dict: DictType }) => {
  const [remainingRewards, setRemainingRewards] = useState<number | null>(null);

  useEffect(() => {
    const fetchRemainingRewards = async () => {
      try {
        const response = await fetch("/api/database/getRemainingRewards", {
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchRemainingRewards();
  }, []);

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

        <span>
          {typeof dict?.algorithm !== "string" && (
            <>{dict?.algorithm.remainingCycle}</>
          )}
        </span>
      </div>
    </>
  );
};

export default RemainingRewards;
