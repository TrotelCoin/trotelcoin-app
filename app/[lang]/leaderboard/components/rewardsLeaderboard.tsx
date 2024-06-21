import React, { useContext } from "react";
import { isAddress } from "viem";
import shortenAddress from "@/utils/addresses/shortenAddress";
import { Skeleton } from "@radix-ui/themes";
import CountUp from "react-countup";
import { LeaderboardItem } from "@/types/leaderboard/leaderboard";
import TrotelPriceContext from "@/contexts/trotelPrice";

const RewardsLeaderboard = ({
  isLoadingLeaderboard,
  leaderboard,
  numberOfItems
}: {
  isLoadingLeaderboard: boolean;
  leaderboard: LeaderboardItem[];
  numberOfItems: number;
}) => {
  const { storedTrotelPrice, showTrotelInUsdc } =
    useContext(TrotelPriceContext);

  return (
    <>
      <ul className="mt-4">
        {!isLoadingLeaderboard ? (
          <>
            <div
              className={`flex flex-col items-center justify-between divide-y divide-gray-900/10 rounded-2xl border border-gray-900/10 bg-white text-center text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
            >
              {leaderboard &&
                Array.isArray(leaderboard) &&
                leaderboard.slice(0, numberOfItems).map((entry, index) => (
                  <li
                    key={index}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-gray-100">
                      {index + 1}
                    </div>
                    <div className="hidden md:block">{entry.wallet}</div>
                    <div className="block md:hidden">
                      {entry.wallet && isAddress(entry.wallet)
                        ? shortenAddress(entry.wallet)
                        : entry.wallet}
                    </div>
                    <div className="flex items-center text-lg md:gap-2">
                      <span>
                        <CountUp
                          start={0}
                          prefix={showTrotelInUsdc ? "$" : ""}
                          end={
                            leaderboard &&
                            leaderboard[index].total_rewards_pending
                              ? showTrotelInUsdc
                                ? leaderboard[index].total_rewards_pending *
                                  (storedTrotelPrice as number)
                                : leaderboard[index].total_rewards_pending
                              : 0
                          }
                          decimals={2}
                          suffix=" 💰"
                        />
                      </span>
                    </div>
                  </li>
                ))}
            </div>
          </>
        ) : (
          <>
            <div
              className={`flex flex-col items-center justify-between divide-y divide-gray-900/10 rounded-2xl border border-gray-900/10 bg-white text-center text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
            >
              {[...Array(20)].map((_, index) => (
                <li
                  key={index}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4"
                >
                  <Skeleton>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-gray-100">
                      0
                    </div>
                  </Skeleton>
                  <div className="hidden md:block">
                    <Skeleton>0x0000000000000000000000</Skeleton>
                  </div>
                  <div className="block md:hidden">
                    <Skeleton>0x000000000</Skeleton>
                  </div>
                  <div className="flex items-center text-lg md:gap-2">
                    <span>
                      <Skeleton>0 💰</Skeleton>
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </>
        )}
      </ul>
    </>
  );
};

export default RewardsLeaderboard;
