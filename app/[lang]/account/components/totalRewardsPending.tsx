import { DictType } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { use, useEffect, useState } from "react";

const TotalRewardsPending = ({ dict }: { dict: DictType }) => {
  const [totalRewardsPending, setTotalRewardsPending] = useState<number | null>(
    null
  );

  const address = useAddress();

  useEffect(() => {
    const fetchRewardsPending = async () => {
      await fetch(`/api/database/totalRewardsPending?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
        .then((response) => response?.json())
        .then((data) => {
          setTotalRewardsPending(data);
        });
    };

    if (address) {
      fetchRewardsPending();

      const interval = setInterval(fetchRewardsPending, 10000);

      return () => clearInterval(interval);
    } else {
      setTotalRewardsPending(0);
    }
  }, [address]);

  return (
    <>
      <div
        className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {totalRewardsPending ? (
                  <span>{Math.floor(totalRewardsPending)}</span>
                ) : (
                  <span className="animate__animated animate__flash animate__slower animate__infinite">
                    0
                  </span>
                )}
              </span>
            </>
          </span>
          <span>
            {typeof dict?.account !== "string" && (
              <>{dict?.account.rewardsPending}</>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default TotalRewardsPending;
