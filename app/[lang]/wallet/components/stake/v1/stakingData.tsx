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
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import { Address } from "viem";
import trotelCoinStakingV1ABI from "@/abi/staking/trotelCoinStakingV1";
import { polygon } from "viem/chains";
import {
  oneYear,
  sixMonths,
  thirstyDays,
  threeMonths,
} from "@/data/staking/duration";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";

const staking =
  "inline-flex items-center rounded-xl bg-green-400 px-2 py-1 text-xs font-medium text-gray-100";
const notStaking =
  "inline-flex items-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium text-gray-100";

const StakingData = ({ lang }: { lang: Lang }) => {
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number>(0);
  const [earnedTrotelCoins, setEarnedTrotelCoins] = useState<number>(0);
  const [availableTrotelCoins, setAvailableTrotelCoins] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isStaking, setIsStaking] = useState<boolean>(false);
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
      abi: trotelCoinStakingV1ABI,
      address: trotelCoinStakingV1,
      functionName: "stakings",
      args: [address as Address],
    });

  useEffect(() => {
    refetchBalance();
    refetchStakings();
  }, [blockNumber]);

  useEffect(() => {
    if (block && !blockFetched) {
      const timestamp = Number(block.timestamp);
      setTimestamp(timestamp);
      setBlockFetched(true);
    }
  }, [block]);

  useEffect(() => {
    if (getStakingDataNoTyped && address) {
      const getStakingData = getStakingDataNoTyped as any[];
      const stakedTrotelCoins = Number(getStakingData[0]);
      const startTime = Number(getStakingData[1]);
      const duration = Number(getStakingData[2]);
      const timeLeft = startTime + duration - (timestamp as number);
      const isStaking = getStakingData[0] > 0 && timeLeft > 0;

      switch (duration) {
        case thirstyDays:
          setEarnedTrotelCoins(stakedTrotelCoins * 0.03);
          break;
        case threeMonths:
          setEarnedTrotelCoins(stakedTrotelCoins * 0.06);
          break;
        case sixMonths:
          setEarnedTrotelCoins(stakedTrotelCoins * 0.1);
          break;
        case oneYear:
          setEarnedTrotelCoins(stakedTrotelCoins * 0.15);
          break;
        default:
          setEarnedTrotelCoins(0);
          break;
      }

      setStakedTrotelCoins(stakedTrotelCoins);
      setTimeLeft(Math.max(0, timeLeft));
      setIsStaking(isStaking);

      const interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setStakedTrotelCoins(0);
      setTimeLeft(0);
      setIsStaking(false);
      setEarnedTrotelCoins(0);
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
            {availableTrotelCoins.toLocaleString("en-US")} <TrotelCoinLogo />
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Deposit" : "Dépôt"}</span>
          <div className="flex items-center gap-1">
            {Math.floor(stakedTrotelCoins * 1e-18).toLocaleString("en-US")}{" "}
            <TrotelCoinLogo />
          </div>
        </div>
        <div className="flex justify-between">
          <span>
            {lang === "en" ? "Earned rewards" : "Récompenses gagnées"}
          </span>
          <div className="flex items-center gap-1">
            {Math.floor(earnedTrotelCoins * 1e-18).toLocaleString("en-US")}{" "}
            <TrotelCoinLogo />
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Time left" : "Temps restant"}</span>
          <div>
            {Math.floor(timeLeft / 60).toLocaleString("en-US")}{" "}
            <span className="text-xs">{lang === "en" ? "mins" : "mins"}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Status" : "Statut"}</span>
          <div>
            <span
              className={`${
                isStaking || stakedTrotelCoins > 0 ? staking : notStaking
              }`}
            >
              {isStaking
                ? lang === "en"
                  ? "Staking"
                  : "Misé"
                : stakedTrotelCoins > 0
                ? lang === "en"
                  ? "Claimable"
                  : "Réclamable"
                : lang === "en"
                ? "Not staking"
                : "Non misé"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingData;
