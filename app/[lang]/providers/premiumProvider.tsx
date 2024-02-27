"use client";

import { useAddress } from "@thirdweb-dev/react";
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
import { useContractRead } from "wagmi";
import { Address } from "viem";
import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";

const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const address = useAddress();

  const { data: early } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinEarlyABI,
    address: trotelCoinEarlyAddress,
    functionName: "balanceOf",
    args: [address],
    enabled: Boolean(address),
    account: address as Address,
    watch: true,
  });
  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  const earlyBalance: number = parseFloat(early as string);
  const isEarly: boolean = earlyBalance > 0;
  const intermediateBalance: number = parseFloat(intermediate as string);
  const expertBalance: number = parseFloat(expert as string);

  const isNotPremium = intermediateBalance <= 0 && expertBalance <= 0;

  const contextValue = useMemo(
    () => ({
      isPremium: !isNotPremium,
      intermediateBalance,
      expertBalance,
      isEarly,
      earlyBalance,
      isNotPremium,
    }),
    [isNotPremium, intermediateBalance, expertBalance, isEarly, earlyBalance]
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
