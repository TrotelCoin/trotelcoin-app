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
import { loadingFlashClass } from "@/style/loading";
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
      refreshInterval: refreshIntervalTime,
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
                className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-900/10 dark:border-gray-100/10 flex flex-col divide-y divide-gray-900/10 dark:divide-gray-100/10 items-center justify-between backdrop-blur-xl text-center rounded-2xl`}
              >
                {leaderboard &&
                  Array.isArray(leaderboard) &&
                  leaderboard.slice(0, 20).map((entry, index) => (
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
                      <div className="flex items-center md:gap-2 text-lg">
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
