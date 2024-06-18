import type { Lang } from "@/types/language/lang";
import { LeaderboardItem } from "@/types/components/leaderboard";
import React, { useEffect, useState } from "react";
import { isAddress, Address } from "viem";
import shortenAddress from "@/utils/addresses/shortenAddress";
import { getEnsName } from "@wagmi/core";
import { mainnet } from "viem/chains";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import { config } from "@/config/Web3ModalConfig";
import useSWR from "swr";
import { Skeleton } from "@radix-ui/themes";
import CountUp from "react-countup";

const Leaderboard = ({ lang }: { lang: Lang }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | null>(
    null
  );

  const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useSWR(
    `/api/leaderboard`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  useEffect(() => {
    if (leaderboardData) {
      setLeaderboard(leaderboardData.updatedLeaderboard);
    }
  }, [leaderboardData]);

  useEffect(() => {
    const fetchEns = async (address: Address) => {
      const result = await getEnsName(config, {
        address: address,
        chainId: mainnet.id
      });

      return result ?? address;
    };

    const fetchLeaderboard = async (leaderboard: LeaderboardItem[]) => {
      const promises = leaderboard.map(async (entry: LeaderboardItem) => {
        if (entry.wallet && isAddress(entry.wallet)) {
          entry.wallet = await fetchEns(entry.wallet);
        }
        return entry;
      });

      const updatedLeaderboard = await Promise.all(promises);
      setLeaderboard(updatedLeaderboard);
    };

    if (leaderboard) {
      fetchLeaderboard(leaderboard);
    }
  }, [leaderboard]);

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
                leaderboard.slice(0, 20).map((entry, index) => (
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
                      <span className="hidden md:block">
                        <CountUp
                          start={0}
                          end={
                            leaderboard &&
                            leaderboard[index].number_of_quizzes_answered
                              ? leaderboard[index].number_of_quizzes_answered
                              : 0
                          }
                        />{" "}
                        📚
                      </span>
                      <span>
                        <CountUp
                          start={0}
                          end={
                            leaderboard && leaderboard[index].average_marks
                              ? leaderboard[index].average_marks
                              : 0
                          }
                          decimals={0}
                        />
                        /20 🤓
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
                    <span className="hidden md:block">
                      <Skeleton>0 📚</Skeleton>
                    </span>
                    <span>
                      <Skeleton>0/20 🤓</Skeleton>
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

export default Leaderboard;
