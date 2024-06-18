"use client";

import type { Lang } from "@/types/language/lang";
import {
  useBalance,
  useAccount,
  useReadContract,
  useBlockNumber,
  useBlock,
} from "wagmi";
import React, { useEffect, useState } from "react";
import { trotelCoinAddress, trotelCoinStakingV2 } from "@/data/web3/addresses";
import { Address, formatEther } from "viem";
import trotelCoinStakingV2ABI from "@/abi/staking/trotelCoinStakingV2";
import { polygon } from "viem/chains";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import { Skeleton } from "@radix-ui/themes";

const staking =
  "inline-flex items-center rounded-xl bg-green-400 px-2 py-1 text-xs font-medium text-gray-100";
const notStaking =
  "inline-flex items-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium text-gray-100";

const StakingData = ({
  lang,
  trotelPrice,
  roundPrice,
  showTrotelInUsdc,
}: {
  lang: Lang;
  trotelPrice: number;
  roundPrice: () => void;
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
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });
  const { data: block } = useBlock({
    chainId: polygon.id,
    blockNumber: blockNumber,
  });

  const { data: balance, refetch: refetchBalance } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    address: address as Address,
  });

  useEffect(() => {
    if (balance && address) {
      const availableBalance = parseFloat(
        parseFloat(balance?.formatted).toFixed(0)
      );
      if (availableBalance > 0) {
        setAvailableTrotelCoins(availableBalance);
      } else {
        setAvailableTrotelCoins(0);
      }
    } else {
      setAvailableTrotelCoins(0);
    }
  }, [balance, address]);

  const { data: getStakingDataNoTyped, refetch: refetchStakings } =
    useReadContract({
      chainId: polygon.id,
      abi: trotelCoinStakingV2ABI,
      address: trotelCoinStakingV2,
      functionName: "stakings",
      args: [address as Address],
    });

  const { data: earnedTrotelCoinsData, refetch: refetchEarnedTrotelCoins } =
    useReadContract({
      chainId: polygon.id,
      abi: trotelCoinStakingV2ABI,
      address: trotelCoinStakingV2,
      functionName: "getUserReward",
      args: [address as Address],
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
  }, [blockNumber]);

  useEffect(() => {
    if (block && !blockFetched) {
      const timestamp = Number(block.timestamp);
      setTimestamp(timestamp);
      setBlockFetched(true);
    }
  }, [block]);

  useEffect(() => {
    if (getStakingDataNoTyped && address && timestamp) {
      const getStakingData = getStakingDataNoTyped as any[];
      const stakedTrotelCoins = Number(getStakingData[0]);
      const startTime = Number(getStakingData[1]);
      const duration = Number(getStakingData[2]);
      let timeLeft: number = 0;
      if (startTime && duration && timestamp) {
        timeLeft = startTime + duration - timestamp;
      }
      const isStaking = getStakingData[0] > 0 && timeLeft > 0;

      setStakedTrotelCoins(stakedTrotelCoins);
      setTimeLeft(Math.max(0, timeLeft));
      setIsStaking(isStaking);

      const interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setStakedTrotelCoins(0);
      setTimeLeft(0);
      setIsStaking(false);
    }
  }, [getStakingDataNoTyped, address, timestamp]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <span className="text-2xl font-bold">
          {lang === "en" ? "Statistics" : "Statistiques"}
        </span>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Available" : "Disponible"}</span>
          <div className="flex items-center gap-1">
            <Skeleton
              loading={
                !availableTrotelCoins || (!trotelPrice && showTrotelInUsdc)
              }
            >
              {showTrotelInUsdc && "$"}
              {availableTrotelCoins &&
                !showTrotelInUsdc &&
                availableTrotelCoins.toLocaleString("en-US")}
              {availableTrotelCoins &&
                showTrotelInUsdc &&
                roundPrice(availableTrotelCoins * trotelPrice).toLocaleString(
                  "en-US"
                )}{" "}
              <TrotelCoinLogo />
            </Skeleton>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Deposit" : "Dépôt"}</span>
          <div className="flex items-center gap-1">
            <Skeleton
              loading={!stakedTrotelCoins || (!trotelPrice && showTrotelInUsdc)}
            >
              {showTrotelInUsdc && "$"}
              {stakedTrotelCoins &&
                showTrotelInUsdc &&
                roundPrice(
                  stakedTrotelCoins * 1e-18 * trotelPrice
                ).toLocaleString("en-US")}
              {stakedTrotelCoins &&
                !showTrotelInUsdc &&
                roundPrice(stakedTrotelCoins * 1e-18).toLocaleString(
                  "en-US"
                )}{" "}
              <TrotelCoinLogo />
            </Skeleton>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Earned" : "Récompenses"}</span>
          <div className="flex items-center gap-1">
            <Skeleton
              loading={!earnedTrotelCoins || (!trotelPrice && showTrotelInUsdc)}
            >
              {showTrotelInUsdc && "$"}
              {earnedTrotelCoins &&
                showTrotelInUsdc &&
                roundPrice(
                  earnedTrotelCoins * 1e-18 * trotelPrice
                ).toLocaleString("en-US")}
              {earnedTrotelCoins &&
                !showTrotelInUsdc &&
                roundPrice(earnedTrotelCoins * 1e-18).toLocaleString(
                  "en-US"
                )}{" "}
              <TrotelCoinLogo />
            </Skeleton>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Time left" : "Temps restant"}</span>
          <div>
            <Skeleton loading={!timeLeft}>
              {timeLeft && Math.floor(timeLeft / 60).toLocaleString("en-US")}{" "}
              <span className="text-xs">{lang === "en" ? "mins" : "mins"}</span>
            </Skeleton>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Status" : "Statut"}</span>
          <div>
            <Skeleton loading={!isStaking || !stakedTrotelCoins}>
              <span
                className={`${
                  isStaking || (stakedTrotelCoins && stakedTrotelCoins > 0)
                    ? staking
                    : notStaking
                }`}
              >
                {isStaking
                  ? lang === "en"
                    ? "Staking"
                    : "Misé"
                  : stakedTrotelCoins && stakedTrotelCoins > 0
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
    </>
  );
};

export default StakingData;
