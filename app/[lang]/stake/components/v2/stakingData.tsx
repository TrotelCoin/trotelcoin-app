"use client";

import type { Lang } from "@/types/language/lang";
import {
  useBalance,
  useAccount,
  useReadContract,
  useBlockNumber,
  useBlock
} from "wagmi";
import React, { useContext, useEffect, useState } from "react";
import { getContractAddress } from "@/data/web3/addresses";
import { Address, formatEther } from "viem";
import { getAbi } from "@/abis/abis";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import { Skeleton } from "@radix-ui/themes";
import { roundPrice } from "@/utils/price/roundPrice";
import ChainContext from "@/contexts/chain";

const stakingClass =
  "inline-flex items-center rounded-xl bg-green-400 px-2 py-1 text-xs font-medium text-gray-100";
const notStakingClass =
  "inline-flex items-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium text-gray-100";

const StakingData = ({
  lang,
  trotelPrice,
  showTrotelInUsdc
}: {
  lang: Lang;
  trotelPrice: number;
  showTrotelInUsdc: boolean;
}) => {
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number | null>(
    null
  );
  const [earnedTrotelCoins, setEarnedTrotelCoins] = useState<number | null>(
    null
  );
  const [availableTrotelCoins, setAvailableTrotelCoins] = useState<
    number | null
  >(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isStaking, setIsStaking] = useState<boolean | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });
  const { data: block } = useBlock({
    chainId: chain.id,
    blockNumber: blockNumber
  });

  const {
    data: balance,
    refetch: refetchBalance,
    isLoading: isLoadingBalance
  } = useBalance({
    chainId: chain.id,
    token: getContractAddress(chain.id, "trotelCoinAddress"),
    address: address as Address
  });

  useEffect(() => {
    if (balance && address) {
      const availableBalance = parseFloat(
        parseFloat(balance.formatted).toFixed(0)
      );
      setAvailableTrotelCoins(availableBalance > 0 ? availableBalance : 0);
    } else {
      setAvailableTrotelCoins(0);
    }
  }, [balance, address]);

  const {
    data: getStakingDataNoTyped,
    refetch: refetchStakings,
    isLoading: isLoadingStakingData
  } = useReadContract({
    chainId: chain.id,
    abi: getAbi(chain.id, "trotelCoinStakingV2"),
    address: getContractAddress(chain.id, "trotelCoinStakingV2"),
    functionName: "stakings",
    args: [address as Address]
  });

  const {
    data: earnedTrotelCoinsData,
    refetch: refetchEarnedTrotelCoins,
    isLoading: isLoadingEarnedData
  } = useReadContract({
    chainId: chain.id,
    abi: getAbi(chain.id, "trotelCoinStakingV2"),
    address: getContractAddress(chain.id, "trotelCoinStakingV2"),
    functionName: "getUserReward",
    args: [address as Address]
  });

  useEffect(() => {
    if (earnedTrotelCoinsData) {
      const earned = Number(formatEther(earnedTrotelCoinsData as bigint));
      setEarnedTrotelCoins(earned);
    } else {
      setEarnedTrotelCoins(0);
    }
  }, [earnedTrotelCoinsData]);

  useEffect(() => {
    refetchBalance();
    refetchStakings();
    refetchEarnedTrotelCoins();
  }, [blockNumber, refetchBalance, refetchStakings, refetchEarnedTrotelCoins]);

  useEffect(() => {
    if (block) {
      const timestamp = Number(block.timestamp);
      setTimestamp(timestamp);
    }
  }, [block]);

  useEffect(() => {
    if (getStakingDataNoTyped && address && timestamp) {
      const getStakingData = getStakingDataNoTyped as any[];
      const stakedTrotelCoins = Number(getStakingData[0]);
      const startTime = Number(getStakingData[1]);
      const duration = Number(getStakingData[2]);
      const timeLeft = startTime + duration - timestamp;
      const isStaking = stakedTrotelCoins > 0;

      setStakedTrotelCoins(stakedTrotelCoins);
      setTimeLeft(timeLeft);
      setIsStaking(isStaking);

      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev as number) - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setStakedTrotelCoins(0);
      setTimeLeft(0);
      setIsStaking(false);
    }
  }, [getStakingDataNoTyped, address, timestamp]);

  const displayValue = (value: number | null) =>
    value !== null ? value.toLocaleString("en-US") : "0";

  return (
    <div className="flex flex-col flex-wrap gap-2">
      <span className="text-2xl font-bold">
        {lang === "en" ? "Statistics" : "Statistiques"}
      </span>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Available" : "Disponible"}</span>
        <div className="flex items-center gap-1">
          <Skeleton
            loading={isLoadingBalance || (!trotelPrice && showTrotelInUsdc)}
          >
            {showTrotelInUsdc && "$"}
            {displayValue(
              showTrotelInUsdc
                ? roundPrice((availableTrotelCoins as number) * trotelPrice)
                : availableTrotelCoins
            )}{" "}
            <TrotelCoinLogo />
          </Skeleton>
        </div>
      </div>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Deposit" : "Dépôt"}</span>
        <div className="flex items-center gap-1">
          <Skeleton
            loading={isLoadingStakingData || (!trotelPrice && showTrotelInUsdc)}
          >
            {showTrotelInUsdc && "$"}
            {displayValue(
              showTrotelInUsdc
                ? roundPrice(
                    (stakedTrotelCoins as number) * 1e-18 * trotelPrice
                  )
                : roundPrice((stakedTrotelCoins as number) * 1e-18)
            )}{" "}
            <TrotelCoinLogo />
          </Skeleton>
        </div>
      </div>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Earned" : "Récompenses"}</span>
        <div className="flex items-center gap-1">
          <Skeleton
            loading={isLoadingEarnedData || (!trotelPrice && showTrotelInUsdc)}
          >
            {showTrotelInUsdc && "$"}
            {displayValue(
              showTrotelInUsdc
                ? roundPrice((earnedTrotelCoins as number) * trotelPrice)
                : roundPrice(earnedTrotelCoins as number)
            )}{" "}
            <TrotelCoinLogo />
          </Skeleton>
        </div>
      </div>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Time left" : "Temps restant"}</span>
        <div>
          <Skeleton loading={isLoadingStakingData}>
            {displayValue(Math.floor(Math.max(0, timeLeft as number) / 60))}{" "}
            <span className="text-xs">{lang === "en" ? "mins" : "mins"}</span>
          </Skeleton>
        </div>
      </div>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Status" : "Statut"}</span>
        <div>
          <Skeleton loading={isLoadingStakingData}>
            <span className={`${isStaking ? stakingClass : notStakingClass}`}>
              {isStaking && !!timeLeft && timeLeft > 0
                ? lang === "en"
                  ? "Staking"
                  : "Misé"
                : !!stakedTrotelCoins &&
                    stakedTrotelCoins > 0 &&
                    !!timeLeft &&
                    timeLeft <= 0
                  ? lang === "en"
                    ? "Claimable"
                    : "Réclamable"
                  : lang === "en"
                    ? "Not staking"
                    : "Non misé"}
            </span>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default StakingData;
