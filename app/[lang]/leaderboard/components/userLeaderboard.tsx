"use client";

import type { Lang } from "@/types/language/lang";
import { useEnsName } from "wagmi";
import React, { useEffect, useState, useContext } from "react";
import { Address } from "viem";
import shortenAddress from "@/utils/addresses/shortenAddress";
import { mainnet } from "viem/chains";
import { Skeleton } from "@radix-ui/themes";
import CountUp from "react-countup";
import type {
  LeaderboardCategories,
  LeaderboardItem,
  Positions
} from "@/types/leaderboard/leaderboard";
import {
  valueToDisplay,
  categorySuffix,
  getCategoryPosition
} from "@/utils/leaderboard/leaderboard";
import TrotelPriceContext from "@/contexts/trotelPrice";

const UserLeaderboardComponent = ({
  lang,
  category,
  isLoadingLeaderboard,
  positions,
  userLeaderboard,
  address
}: {
  lang: Lang;
  category: LeaderboardCategories;
  isLoadingLeaderboard: boolean;
  positions: Positions | null;
  userLeaderboard: LeaderboardItem | null;
  address: Address | undefined;
}) => {
  const [ensName, setEnsName] = useState<string | null>(null);

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

  const renderEns = (ensName: string, address: Address) => {
    if (ensName) return ensName;
    if (address) return address;
    return lang === "en"
      ? "Connect your wallet"
      : "Connectez votre portefeuille";
  };

  return (
    <>
      <div
        className={`mt-4 grid grid-cols-3 rounded-2xl border border-gray-900/10 bg-white p-4 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <Skeleton loading={isLoadingLeaderboard || !positions}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-gray-100">
            {getCategoryPosition(positions, category) ?? "-"}
          </div>
        </Skeleton>
        <div className="hidden items-center justify-center md:flex">
          <Skeleton loading={isLoadingLeaderboard || !address}>
            {renderEns(ensName as string, address as Address)}
          </Skeleton>
        </div>
        <div className="flex items-center justify-center md:hidden">
          <Skeleton loading={isLoadingLeaderboard || !address}>
            {address
              ? shortenAddress(address)
              : lang === "en"
                ? "Connect your wallet"
                : "Connectez votre portefeuille"}
          </Skeleton>
        </div>

        <div className="flex items-center justify-end text-lg md:gap-2">
          <span>
            <Skeleton loading={isLoadingLeaderboard || !userLeaderboard}>
              <CountUp
                start={0}
                prefix={category === "rewards" && showTrotelInUsdc ? "$" : ""}
                end={valueToDisplay(
                  userLeaderboard as LeaderboardItem,
                  category,
                  showTrotelInUsdc,
                  storedTrotelPrice as number
                )}
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
