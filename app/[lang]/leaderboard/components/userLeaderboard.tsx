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
        className={`mt-4 bg-white flex items-center justify-between border-gray-900/10 dark:border-gray-100/10 border backdrop-blur-xl text-center rounded-2xl p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Skeleton loading={!position}>
          <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-100 bg-blue-500">
            {position ?? 0}
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

        <div className="flex items-center md:gap-2 text-lg">
          <span className="hidden md:block">
            <Skeleton loading={!numberOfQuizzesAnswered}>
              <CountUp start={0} end={numberOfQuizzesAnswered ?? 0} /> 📚
            </Skeleton>
          </span>
          <span>
            <Skeleton loading={!averageMarks}>
              <CountUp start={0} end={averageMarks ?? 0} decimals={0} />
              /20 🤓
            </Skeleton>
          </span>
        </div>
      </div>
    </>
  );
};

export default UserLeaderboardComponent;
