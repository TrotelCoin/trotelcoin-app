"use client";

import type { Lang } from "@/types/language/lang";
import { useAccount, useEnsName } from "wagmi";
import React, { useEffect, useState, useContext } from "react";
import { Address, isAddress, getAddress } from "viem";
import shortenAddress from "@/utils/addresses/shortenAddress";
import { mainnet } from "viem/chains";
import { Skeleton } from "@radix-ui/themes";
import CountUp from "react-countup";
import type {
  LeaderboardCategories,
  LeaderboardItem
} from "@/types/leaderboard/leaderboard";
import {
  valueToDisplay,
  categorySuffix
} from "@/utils/leaderboard/leaderboard";
import TrotelPriceContext from "@/contexts/trotelPrice";

const UserLeaderboardComponent = ({
  lang,
  leaderboard,
  category,
  isLoadingLeaderboard
}: {
  lang: Lang;
  leaderboard: LeaderboardItem[] | null;
  category: LeaderboardCategories;
  isLoadingLeaderboard: boolean;
}) => {
  const [position, setPosition] = useState<number | null>(null);
  const [ensName, setEnsName] = useState<string | null>(null);
  const [userLeaderboardItem, setUserLeaderboardItem] =
    useState<LeaderboardItem | null>(null);

  const { address } = useAccount();
  const { showTrotelInUsdc, storedTrotelPrice } =
    useContext(TrotelPriceContext);

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
    if (address && leaderboard && Array.isArray(leaderboard)) {
      leaderboard.map((user: LeaderboardItem, index: number) =>
        isAddress(user.wallet) &&
        getAddress(user.wallet) === getAddress(address)
          ? setPosition(index + 1)
          : null
      );

      const filteredLeaderboard = leaderboard.filter(
        (user: LeaderboardItem) =>
          isAddress(user.wallet) &&
          getAddress(user.wallet) === getAddress(address)
      );

      const userLeaderboardItem = filteredLeaderboard[0];

      setUserLeaderboardItem(userLeaderboardItem);
    }
  }, [address, leaderboard]);

  return (
    <>
      <div
        className={`mt-4 flex items-center justify-between rounded-2xl border border-gray-900/10 bg-white p-4 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <Skeleton loading={isLoadingLeaderboard || !position}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-gray-100">
            {position as number}
          </div>
        </Skeleton>
        <div className="hidden md:block">
          <Skeleton loading={isLoadingLeaderboard || !address}>
            {address && isAddress(address) && !ensName
              ? address
              : ensName ??
                (lang === "en"
                  ? "Connect your wallet"
                  : "Connectez votre portefeuille")}
          </Skeleton>
        </div>
        <div className="block md:hidden">
          <Skeleton loading={isLoadingLeaderboard || !address}>
            {address
              ? shortenAddress(address)
              : lang === "en"
                ? "Connect your wallet"
                : "Connectez votre portefeuille"}
          </Skeleton>
        </div>

        <div className="flex items-center text-lg md:gap-2">
          <span>
            <Skeleton loading={isLoadingLeaderboard || !userLeaderboardItem}>
              <CountUp
                start={0}
                prefix={category === "rewards" && showTrotelInUsdc ? "$" : ""}
                end={
                  userLeaderboardItem
                    ? valueToDisplay(
                        userLeaderboardItem,
                        category,
                        showTrotelInUsdc,
                        storedTrotelPrice as number
                      )
                    : 0
                }
                suffix={categorySuffix(category)}
                decimals={category === "rewards" && showTrotelInUsdc ? 2 : 0}
              />
            </Skeleton>
          </span>
        </div>
      </div>
    </>
  );
};

export default UserLeaderboardComponent;
