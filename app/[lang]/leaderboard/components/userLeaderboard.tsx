"use client";

import type { Lang } from "@/types/language/lang";
import { useAccount, useEnsName } from "wagmi";
import React, { useEffect, useState } from "react";
import { Address, isAddress } from "viem";
import shortenAddress from "@/utils/addresses/shortenAddress";
import { mainnet } from "viem/chains";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { Skeleton } from "@radix-ui/themes";
import CountUp from "react-countup";
import type { UserLeaderboard } from "@/types/leaderboard/leaderboard";

const UserLeaderboardComponent = ({ lang }: { lang: Lang }) => {
  const [position, setPosition] = useState<number | null>(null);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);
  const [averageMarks, setAverageMarks] = useState<number | null>(null);
  const [ensName, setEnsName] = useState<string | null>(null);

  const { address, isConnected } = useAccount();

  const { data, isLoading: isLoadingUserLeaderboard } = useSWR(
    address ? `/api/leaderboard` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  const { data: result } = useEnsName({
    address: address as Address,
    chainId: mainnet.id
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
    if (address && leaderboard && Array.isArray(leaderboard)) {
      leaderboard.map((user: UserLeaderboard, index: number) =>
        user?.wallet === address ? setPosition(index + 1) : null
      );

      const filteredLeaderboard = leaderboard.filter(
        (user: UserLeaderboard) => user?.wallet === address
      );

      setNumberOfQuizzesAnswered(
        filteredLeaderboard[0]?.number_of_quizzes_answered
      );
      setAverageMarks(filteredLeaderboard[0]?.average_marks);
    } else {
      setPosition(null);
      setNumberOfQuizzesAnswered(null);
      setAverageMarks(null);
    }
  }, [address, data]);

  return (
    <>
      <div
        className={`mt-4 flex items-center justify-between rounded-2xl border border-gray-900/10 bg-white p-4 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <Skeleton loading={!position}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-gray-100">
            {position as number}
          </div>
        </Skeleton>
        <div className="hidden md:block">
          <Skeleton loading={!isConnected}>
            {address && isAddress(address) && !ensName
              ? address
              : ensName ??
                (lang === "en"
                  ? "Connect your wallet"
                  : "Connectez votre portefeuille")}
          </Skeleton>
        </div>
        <div className="block md:hidden">
          <Skeleton loading={!isConnected}>
            {address
              ? shortenAddress(address)
              : lang === "en"
                ? "Connect your wallet"
                : "Connectez votre portefeuille"}
          </Skeleton>
        </div>

        <div className="flex items-center text-lg md:gap-2">
          <span className="hidden md:block">
            <Skeleton loading={!numberOfQuizzesAnswered}>
              <CountUp start={0} end={numberOfQuizzesAnswered as number} /> 📚
            </Skeleton>
          </span>
          <span>
            <Skeleton loading={!averageMarks}>
              <CountUp start={0} end={averageMarks as number} decimals={0} />
              /20 🤓
            </Skeleton>
          </span>
        </div>
      </div>
    </>
  );
};

export default UserLeaderboardComponent;
