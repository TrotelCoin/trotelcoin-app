"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import Period from "@/app/[lang]/wallet/components/staking/period";
import StakingData from "@/app/[lang]/wallet/components/staking/stakingData";
import StakingButton from "@/app/[lang]/wallet/components/staking/stakingButton";
import Amount from "@/app/[lang]/wallet/components/staking/amount";
import ClaimingButton from "@/app/[lang]/wallet/components/staking/claimingButton";
import ApproveButton from "@/app/[lang]/wallet/components/staking/approveButton";
import TotalStaked from "@/app/[lang]/wallet/components/staking/totalStaked";
import { trotelCoinAddress, trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinV1ABI from "@/abi/trotelCoinV1";
import { polygon } from "viem/chains";
import { useAccount, useReadContract, useBlockNumber } from "wagmi";
import { Address, formatEther } from "viem";
import Wallet from "@/app/[lang]/components/header/wallet";
import "animate.css";
import WidgetTitle from "@/app/[lang]/wallet/components/widgetTitle";

const Staking = ({
  lang,
  chainError,
  setChainError,
}: {
  lang: Lang;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [stakingPeriod, setStakingPeriod] = useState<number>(30);
  const [APY, setAPY] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [allowance, setAllowance] = useState<number | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  useEffect(() => {
    switch (stakingPeriod) {
      case 30:
        setAPY(3);
        break;
      case 91:
        setAPY(6);
        break;
      case 182:
        setAPY(10);
        break;
      case 365:
        setAPY(15);
        break;
      default:
        setAPY(0);
    }
  }, [stakingPeriod, APY]);

  const { data: allowanceData, refetch } = useReadContract({
    address: trotelCoinAddress,
    abi: trotelCoinV1ABI,
    chainId: polygon.id,
    functionName: "allowance",
    args: [address, trotelCoinStakingV1],
  });

  useEffect(() => {
    if (allowanceData) {
      const allowance = Number(formatEther(allowanceData as bigint));
      setAllowance(allowance);
    }
  }, [allowanceData]);

  useEffect(() => {
    refetch();
  }, [blockNumber, address]);

  return (
    <>
      {" "}
      <div className="mx-auto flex flex-col max-w-md justify-center w-full items-center">
        <div className="w-full flex flex-col flex-wrap bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="px-4 flex flex-col gap-4">
            <span className="text-4xl font-bold text-green-500 dark:text-green-300">
              {APY}%{" "}
              <span className="text-base text-gray-700 dark:text-gray-300">
                ROI
              </span>
            </span>

            <div>
              <Period
                lang={lang}
                stakingPeriod={stakingPeriod}
                setStakingPeriod={setStakingPeriod}
              />
            </div>
            <div>
              <Amount
                lang={lang}
                amount={amount as number}
                setAmount={setAmount}
                address={address as Address}
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-4 flex flex-col flex-wrap bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="px-4 pb-4">
            <StakingData lang={lang} />
          </div>
          <div className="pt-4 px-4">
            <TotalStaked lang={lang} />
          </div>
        </div>

        <div className="mt-4 w-full">
          {address ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                {allowance &&
                (allowance < (amount as number) || amount === undefined) ? (
                  <ApproveButton
                    lang={lang}
                    amount={amount as number}
                    chainError={chainError}
                    setChainError={setChainError}
                    allowance={allowance}
                    setDisabled={setDisabled}
                  />
                ) : (
                  <StakingButton
                    lang={lang}
                    stakingPeriod={stakingPeriod}
                    amount={amount as number}
                    chainError={chainError}
                    setChainError={setChainError}
                    allowance={allowance as number}
                    disabled={disabled}
                  />
                )}
                <ClaimingButton
                  lang={lang}
                  chainError={chainError}
                  setChainError={setChainError}
                />
              </div>
            </>
          ) : (
            <Wallet lang={lang} isFull={true} isCentered={true} />
          )}
        </div>
      </div>
    </>
  );
};

export default Staking;
