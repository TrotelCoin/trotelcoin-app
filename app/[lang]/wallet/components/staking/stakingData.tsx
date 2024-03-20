"use client";

import type { Lang } from "@/types/lang";
import { useBalance, useAccount, useReadContract, useBlockNumber } from "wagmi";
import React, { useEffect, useState } from "react";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import { Address } from "viem";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";
import { polygon } from "viem/chains";

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

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
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

  const { data: getUserStakingDataNoTyped, refetch: refetchStakingDetails } =
    useReadContract({
      chainId: polygon.id,
      abi: trotelCoinStakingV1ABI,
      address: trotelCoinStakingV1,
      functionName: "getUserStakingDetails",
      args: [address as Address],
    });

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
    refetchStakingDetails();
    refetchStakings();
  }, [blockNumber, address]);

  let getStakingData = getStakingDataNoTyped as any[];

  useEffect(() => {
    if (getStakingDataNoTyped) {
      getStakingData = getStakingDataNoTyped as any[];
    }
  }, [getStakingData, address]);

  let getUserStakingData = getUserStakingDataNoTyped as any[];

  useEffect(() => {
    if (getUserStakingDataNoTyped) {
      getUserStakingData = getUserStakingDataNoTyped as any[];
    }
  }, [getUserStakingData, address]);

  useEffect(() => {
    if (getUserStakingData && address) {
      const initialTimeLeft = parseFloat(getUserStakingData[1].toString());
      setEarnedTrotelCoins(getUserStakingData[0].toString());
      setTimeLeft(initialTimeLeft);

      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) =>
          prevTimeLeft > 0 ? prevTimeLeft - 1 : 0
        );
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setTimeLeft(0);
      setEarnedTrotelCoins(0);
    }
  }, [getUserStakingData, address]);

  useEffect(() => {
    if (getStakingData) {
      setStakedTrotelCoins(getStakingData[0].toString());
    } else {
      setStakedTrotelCoins(0);
    }
  }, [getStakingData, address]);

  useEffect(() => {
    if (getUserStakingData) {
      if (getUserStakingData[0].toString() > 0) {
        setIsStaking(true);
      } else {
        setIsStaking(false);
      }
    } else {
      setIsStaking(false);
    }
  }, [getUserStakingData]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="flex justify-between">
          <span>{lang === "en" ? "Available" : "Disponible"}</span>
          <div>
            {availableTrotelCoins.toLocaleString("en-US")}{" "}
            <span className="font-semibold">TROTEL</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Deposit" : "Dépôt"}</span>
          <div>
            {(stakedTrotelCoins * 1e-18).toLocaleString("en-US")}{" "}
            <span className="font-semibold">TROTEL</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>
            {lang === "en" ? "Earned rewards" : "Récompenses gagnées"}
          </span>
          <div>
            {(earnedTrotelCoins * 1e-18).toLocaleString("en-US")}{" "}
            <span className="font-semibold">TROTEL</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Time left" : "Temps restant"}</span>
          <div>
            {timeLeft.toLocaleString("en-US")}{" "}
            <span className="font-semibold">
              {lang === "en" ? "seconds" : "secondes"}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>{lang === "en" ? "Status" : "Statut"}</span>
          <div>
            <span className={`${isStaking ? staking : notStaking}`}>
              {isStaking ? "Staking" : "Not staking"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingData;
