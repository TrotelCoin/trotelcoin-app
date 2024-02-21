import { DictType } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";

const TotalRewards = ({ dict }: { dict: DictType }) => {
  const [tokensEarned, setTokensEarned] = useState<number>(0);
  const [totalRewardsPending, setTotalRewardsPending] = useState<number>(0);
  const [totalRewards, setTotalRewards] = useState<number | null>(null);

  const { address } = useAccount();

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

  useEffect(() => {
    if (totalRewards && totalRewardsPending) {
      setTokensEarned(totalRewards + totalRewardsPending);
    } else if (totalRewards) {
      setTokensEarned(totalRewards);
    } else if (totalRewardsPending) {
      setTokensEarned(totalRewardsPending);
    } else {
      setTokensEarned(0);
    }
  }, [totalRewards, totalRewardsPending, address]);

  return (
    <>
      <div
        className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {tokensEarned ? (
                  <span>{Math.floor(tokensEarned)}</span>
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
              <>{dict?.account.totalRewards}</>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default TotalRewards;
