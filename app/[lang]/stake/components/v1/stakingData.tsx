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
import { Address } from "viem";
import { getAbi } from "@/abis/abis";
import {
  oneYear,
  sixMonths,
  thirstyDays,
  threeMonths
} from "@/data/staking/duration";
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
  const [blockFetched, setBlockFetched] = useState<boolean>(false);

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
    abi: getAbi(chain.id, "trotelCoinStakingV1"),
    address: getContractAddress(chain.id, "trotelCoinStakingV1"),
    functionName: "stakings",
    args: [address as Address]
  });

  useEffect(() => {
    refetchBalance();
    refetchStakings();
  }, [blockNumber, refetchBalance, refetchStakings]);

  useEffect(() => {
    if (block && !blockFetched) {
      const timestamp = Number(block.timestamp);
      setTimestamp(timestamp);
      setBlockFetched(true);
    }
  }, [block, blockFetched]);

  useEffect(() => {
    if (getStakingDataNoTyped && address) {
      const getStakingData = getStakingDataNoTyped as any[];
      const stakedTrotelCoins = Number(getStakingData[0]);
      const startTime = Number(getStakingData[1]);
      const duration = Number(getStakingData[2]);
      const timeLeft = startTime + duration - (timestamp as number);
      const isStaking = stakedTrotelCoins > 0;

      let earnedCoins = 0;
      switch (duration) {
        case thirstyDays:
          earnedCoins = stakedTrotelCoins * 0.03;
          break;
        case threeMonths:
          earnedCoins = stakedTrotelCoins * 0.06;
          break;
        case sixMonths:
          earnedCoins = stakedTrotelCoins * 0.1;
          break;
        case oneYear:
          earnedCoins = stakedTrotelCoins * 0.15;
          break;
      }

      setStakedTrotelCoins(stakedTrotelCoins);
      setEarnedTrotelCoins(earnedCoins);
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
      setEarnedTrotelCoins(0);
    }
  }, [getStakingDataNoTyped, address, timestamp]);

  const displayValue = (value: number | null) =>
    value ? value.toLocaleString("en-US") : "0";

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
            loading={isLoadingStakingData || (!trotelPrice && showTrotelInUsdc)}
          >
            {showTrotelInUsdc && "$"}
            {displayValue(
              showTrotelInUsdc
                ? roundPrice(
                    (earnedTrotelCoins as number) * 1e-18 * trotelPrice
                  )
                : roundPrice((earnedTrotelCoins as number) * 1e-18)
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
