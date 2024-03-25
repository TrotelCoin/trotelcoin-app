import type { Lang } from "@/types/lang";
import { LeaderboardItem } from "@/types/components/components";
import React, { useEffect, useState } from "react";
import { isAddress, Address } from "viem";
import shortenAddress from "@/utils/shortenAddress";
import { getEnsName } from "@wagmi/core";
import { mainnet } from "viem/chains";
import { fetcher } from "@/lib/axios/fetcher";
import { config } from "@/config/Web3ModalConfig";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import CountUp from "react-countup";

const Leaderboard = ({ lang }: { lang: Lang }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | null>(
    null
  );

  const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useSWR(
    `/api/database/getLeaderboard`,
    fetcher
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
        chainId: mainnet.id,
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
      <React.Suspense fallback={null}>
        <ul className="mt-4">
          {!isLoadingLeaderboard ? (
            <>
              <div
                className={`bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-900/10 dark:border-gray-100/10 flex flex-col divide-y divide-gray-900/10 dark:divide-gray-100/10 items-center justify-between backdrop-blur-xl text-center rounded-2xl`}
              >
                {leaderboard &&
                  Array.isArray(leaderboard) &&
                  leaderboard.map((entry, index) => (
                    <li
                      key={index}
                      className="w-full flex items-center justify-between gap-4 py-4 px-6"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-100 bg-blue-500">
                        {index + 1}
                      </div>
                      <div className="hidden md:block">{entry.wallet}</div>
                      <div className="block md:hidden">
                        {entry.wallet && isAddress(entry.wallet)
                          ? shortenAddress(entry.wallet)
                          : entry.wallet}
                      </div>
                      <div className="flex items-center gap-2 text-lg">
                        <span>
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
                              leaderboard && leaderboard[index].current_streak
                                ? leaderboard[index].current_streak
                                : 0
                            }
                          />{" "}
                          🔥
                        </span>
                      </div>
                    </li>
                  ))}
              </div>
            </>
          ) : (
            <>
              <p
                className={`mt-2 text-gray-700 dark:text-gray-300 ${loadingFlashClass}`}
              >
                {lang === "en" ? <>Loading...</> : <>Chargement...</>}
              </p>
            </>
          )}
        </ul>
      </React.Suspense>
    </>
  );
};

export default Leaderboard;
