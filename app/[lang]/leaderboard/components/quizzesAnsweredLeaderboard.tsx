import React from "react";
import { isAddress } from "viem";
import shortenAddress from "@/utils/addresses/shortenAddress";
import { Skeleton } from "@radix-ui/themes";
import CountUp from "react-countup";
import { LeaderboardItem } from "@/types/leaderboard/leaderboard";

const QuizzesAnsweredLeaderboard = ({
  isLoadingLeaderboard,
  leaderboard,
  numberOfItems
}: {
  isLoadingLeaderboard: boolean;
  leaderboard: LeaderboardItem[];
  numberOfItems: number;
}) => {
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
                leaderboard
                  .sort(
                    (a, b) =>
                      b.number_of_quizzes_answered -
                      a.number_of_quizzes_answered
                  )
                  .slice(0, numberOfItems)
                  .map((entry, index) => (
                    <li
                      key={index}
                      className="grid w-full grid-cols-3 gap-4 px-6 py-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-gray-100">
                        {index + 1}
                      </div>
                      <div className="hidden items-center justify-center md:flex">
                        {entry.ens ?? entry.wallet}
                      </div>
                      <div className="flex items-center justify-center md:hidden">
                        {entry.ens
                          ? entry.ens
                          : entry.wallet && isAddress(entry.wallet)
                            ? shortenAddress(entry.wallet)
                            : entry.wallet}
                      </div>
                      <div className="flex items-center justify-end text-lg md:gap-2">
                        <span>
                          <CountUp
                            start={0}
                            end={
                              leaderboard &&
                              leaderboard[index]?.number_of_quizzes_answered
                            }
                            decimals={0}
                            suffix=" 📚"
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
                  <Skeleton>
                    <div className="flex items-center text-lg md:gap-2">
                      <span>0 📚</span>
                    </div>
                  </Skeleton>
                </li>
              ))}
            </div>
          </>
        )}
      </ul>
    </>
  );
};

export default QuizzesAnsweredLeaderboard;
