import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import Period from "@/app/[lang]/wallet/components/stake/v1/period";
import StakingData from "@/app/[lang]/wallet/components/stake/v1/stakingData";
import Amount from "@/app/[lang]/wallet/components/stake/amount";
import ClaimingButton from "@/app/[lang]/wallet/components/stake/v1/buttons/claimingButton";
import TotalStaked from "@/app/[lang]/wallet/components/stake/v1/totalStaked";
import { polygon } from "viem/chains";
import { useAccount, useChainId } from "wagmi";
import { Address } from "viem";
import Wallet from "@/app/[lang]/components/header/wallet";
import "animate.css";

const StakingV1 = ({ lang }: { lang: Lang }) => {
  const [chainError, setChainError] = useState<boolean>(false);
  const [APR, setAPR] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [isMax, setIsMax] = useState<boolean>(false);
  const [stakingPeriod, setStakingPeriod] = useState<number>(30);

  const { address } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    if (chainId !== polygon.id) {
      setChainError(true);
    } else {
      setChainError(false);
    }
  }, [chainId]);

  useEffect(() => {
    switch (stakingPeriod) {
      case 30:
        setAPR(3);
        break;
      case 91:
        setAPR(6);
        break;
      case 182:
        setAPR(10);
        break;
      case 365:
        setAPR(15);
        break;
      default:
        setAPR(0);
    }
  }, [stakingPeriod, APR]);

  return (
    <>
      <div className="mx-auto flex flex-col max-w-md justify-center w-full items-center">
        <div className="w-full flex flex-col flex-wrap bg-gray-50 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="px-4 flex flex-col gap-4">
            <span className="text-4xl font-bold text-green-500 dark:text-green-300">
              {APR}%{" "}
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
                isMax={isMax}
                setIsMax={setIsMax}
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-4 flex flex-col flex-wrap bg-gray-50 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="px-4 pb-4">
            <StakingData lang={lang} />
          </div>
          <div className="pt-4 px-4">
            <TotalStaked lang={lang} />
          </div>
        </div>

        <div className="mt-4 w-full">
          {address ? (
            <div className="grid grid-cols-1">
              <ClaimingButton
                lang={lang}
                chainError={chainError}
                setChainError={setChainError}
              />
            </div>
          ) : (
            <Wallet lang={lang} isFull={true} isCentered={true} />
          )}
        </div>
      </div>
    </>
  );
};

export default StakingV1;
