"use client";

import { useAccount, useReadContract, useBlockNumber } from "wagmi";
import React, { useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import PremiumContext from "@/contexts/premium";
import { getContractAddress } from "@/data/web3/addresses";
import { getAbi } from "@/abis/abis";
import { formatEther, Address } from "viem";
import {
  expertStakingBalance,
  intermediateStakingBalance
} from "@/data/staking/premium";
import ChainContext from "@/contexts/chain";

const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const [totalStakingAmount, setTotalStakingAmount] = useState<number | null>(
    null
  );

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { data: early, refetch: refetchEarly } = useReadContract({
    chainId: chain.id,
    abi: getAbi(chain.id, "trotelCoinEarly"),
    address: getContractAddress(chain.id, "trotelCoinEarlyAddress"),
    functionName: "balanceOf",
    args: [address as Address]
  });
  const { data: stakingsDataV1, refetch: refetchStakingV1 } = useReadContract({
    chainId: chain.id,
    abi: getAbi(chain.id, "trotelCoinStakingV1"),
    address: getContractAddress(chain.id, "trotelCoinStakingV1"),
    functionName: "stakings",
    args: [address as Address]
  });

  const { data: stakingsDataV2, refetch: refetchStakingV2 } = useReadContract({
    chainId: chain.id,
    abi: getAbi(chain.id, "trotelCoinStakingV2"),
    address: getContractAddress(chain.id, "trotelCoinStakingV2"),
    functionName: "stakings",
    args: [address as Address]
  });

  useEffect(() => {
    refetchStakingV1();
    refetchStakingV2();
  }, [blockNumber]);

  useEffect(() => {
    let stakingsV1 = stakingsDataV1 as any[];
    let stakingsV2 = stakingsDataV2 as any[];

    if (address && (stakingsV1 || stakingsV2)) {
      if (stakingsV1 === undefined) {
        stakingsV1 = [0];
      }

      if (stakingsV2 === undefined) {
        stakingsV2 = [0];
      }

      const amountV1 = Number(formatEther(stakingsV1[0] as bigint));
      const amountV2 = Number(formatEther(stakingsV2[0] as bigint));

      const totalStakingAmount = Math.floor(amountV1 + amountV2);

      setTotalStakingAmount(totalStakingAmount);
    } else {
      setTotalStakingAmount(0);
    }
  }, [address, stakingsDataV1, stakingsDataV2]);

  const earlyBalance: number = parseFloat(early as string);
  const isEarly: boolean = earlyBalance > 0;

  const isIntermediate = totalStakingAmount
    ? totalStakingAmount >= intermediateStakingBalance
    : false; // 10,000 TROTEL
  const isExpert = totalStakingAmount
    ? totalStakingAmount >= expertStakingBalance
    : false; // 50,000 TROTEL

  const isNotPremium = !isIntermediate && !isExpert;
  const isPremium = !isNotPremium;

  useEffect(() => {
    refetchEarly();
    refetchStakingV1();
    refetchStakingV2();
  }, [blockNumber, address]);

  const contextValue = useMemo(
    () => ({
      isPremium,
      isEarly,
      earlyBalance,
      isNotPremium,
      isIntermediate,
      isExpert,
      totalStakingAmount
    }),
    [
      isNotPremium,
      isEarly,
      earlyBalance,
      isExpert,
      isIntermediate,
      totalStakingAmount
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
