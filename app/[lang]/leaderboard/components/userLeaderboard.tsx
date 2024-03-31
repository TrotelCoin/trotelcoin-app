"use client";

import type { Lang } from "@/types/lang";
import { useAccount, useEnsName } from "wagmi";
import React, { useEffect, useState } from "react";
import { Address, isAddress } from "viem";
import shortenAddress from "@/utils/shortenAddress";
import { mainnet } from "viem/chains";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import CountUp from "react-countup";
import type { UserLeaderboard } from "@/types/leaderboard/leaderboard";

const UserLeaderboardComponent = ({ lang }: { lang: Lang }) => {
  const [position, setPosition] = useState<number | null>(null);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [ensName, setEnsName] = useState<string | null>(null);

  const { address } = useAccount();

  const { data, isLoading: isLoadingUserLeaderboard } = useSWR(
    address ? `/api/database/getLeaderboard` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  const { data: result } = useEnsName({
    address: address as Address,
    chainId: mainnet.id,
  });

  useEffect(() => {
    if (result) {
      setEnsName(result);
    } else {
      setEnsName(null);
    }
  }, [result]);

  useEffect(() => {
    const leaderboard = data?.updatedLeaderboard;
    if (leaderboard && Array.isArray(leaderboard)) {
      leaderboard.map((user: UserLeaderboard, index: number) =>
        user?.wallet === address ? setPosition(index + 1) : null
      );

      const filteredLeaderboard = leaderboard.filter(
        (user: UserLeaderboard) => user?.wallet === address
      );

      setNumberOfQuizzesAnswered(
        filteredLeaderboard[0]?.number_of_quizzes_answered
      );
      setStreak(filteredLeaderboard[0]?.current_streak);
    } else {
      setPosition(null);
      setNumberOfQuizzesAnswered(null);
      setStreak(null);
    }
  }, [address, data]);

  return (
    <>
      <React.Suspense fallback={null}>
        {isLoadingUserLeaderboard ? (
          <>
            <p
              className={`mt-2 text-gray-700 dark:text-gray-300 ${loadingFlashClass}`}
            >
              {lang === "en" ? <>Loading...</> : <>Chargement...</>}
            </p>
          </>
        ) : (
          <>
            {address ? (
              <>
                {position && (
                  <div
                    className={`mt-4 bg-gray-50 flex items-center justify-between ${
                      position < 4
                        ? "rainbow-border"
                        : "border-gray-900/10 dark:border-gray-100/10"
                    } border backdrop-blur-xl text-center rounded-2xl p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-100 bg-blue-500">
                      {position ?? 0}
                    </div>
                    <div className="hidden md:block">
                      {address && isAddress(address) && !ensName
                        ? address
                        : ensName ??
                          (lang === "en"
                            ? "Connect your wallet"
                            : "Connectez votre portefeuille")}
                    </div>
                    <div className="block md:hidden">
                      {address
                        ? shortenAddress(address)
                        : lang === "en"
                        ? "Connect your wallet"
                        : "Connectez votre portefeuille"}
                    </div>

                    <div className="flex items-center gap-2 text-lg">
                      <span>
                        <CountUp start={0} end={numberOfQuizzesAnswered ?? 0} />{" "}
                        📚
                      </span>
                      <span>
                        <CountUp start={0} end={streak ?? 0} /> 🔥
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {lang === "en" ? (
                    <>Connect your wallet</>
                  ) : (
                    <>Connectez votre portefeuille</>
                  )}
                </p>
              </>
            )}
          </>
        )}
      </React.Suspense>
    </>
  );
};

export default UserLeaderboardComponent;
