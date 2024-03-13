"use client";

import { useAccount, useReadContract } from "wagmi";
import React, { useMemo } from "react";
import type { ReactNode } from "react";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
  trotelCoinEarlyAddress,
} from "@/data/web3/addresses";
import { polygon } from "viem/chains";
import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";

const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const address = useAccount();

  const { data: early } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinEarlyABI,
    address: trotelCoinEarlyAddress,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: intermediate } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: expert } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address],
  });

  const earlyBalance: number = parseFloat(early as string);
  const isEarly: boolean = earlyBalance > 0;
  const intermediateBalance: number = parseFloat(intermediate as string);
  const expertBalance: number = parseFloat(expert as string);

  const isNotPremium = intermediateBalance <= 0 && expertBalance <= 0;
  const isPremium = !isNotPremium;

  const isExpert = expertBalance > 0;
  const isIntermediate = intermediateBalance > 0;

  const contextValue = useMemo(
    () => ({
      isPremium,
      intermediateBalance,
      expertBalance,
      isEarly,
      earlyBalance,
      isNotPremium,
      isIntermediate,
      isExpert,
    }),
    [
      isNotPremium,
      intermediateBalance,
      expertBalance,
      isEarly,
      earlyBalance,
      isExpert,
      isIntermediate,
    ]
  );

  return (
    <>
      <PremiumContext.Provider value={contextValue}>
        {children}
      </PremiumContext.Provider>
    </>
  );
};

export default PremiumProvider;
