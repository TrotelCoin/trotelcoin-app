"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import Period from "@/app/[lang]/wallet/components/period";
import StakingData from "@/app/[lang]/wallet/components/stakingData";
import StakingButton from "@/app/[lang]/wallet/components/stakingButton";
import Amount from "@/app/[lang]/wallet/components/amount";
import ClaimingButton from "@/app/[lang]/wallet/components/claimingButton";
import ApproveButton from "@/app/[lang]/wallet/components/approveButton";
import TotalStaked from "@/app/[lang]/wallet/components/totalStaked";

const Staking = ({ lang }: { lang: Lang }) => {
  const [stakingPeriod, setStakingPeriod] = useState<number>(30);
  const [APY, setAPY] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [amountError, setAmountError] = useState<string | null>(null);

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

  useEffect(() => {
    if (amount) {
      if (amount < 0) {
        setAmountError(
          lang === "en"
            ? "The amount must be positive"
            : "Le montant doit être positif"
        );
      } else if (!Number(amount)) {
        setAmountError(
          lang === "en"
            ? "The amount must be a number"
            : "Le montant doit être un nombre"
        );
      } else {
        setAmountError(null);
      }
    }
  }, [amount]);

  return (
    <>
      <div className="mt-4 w-full flex flex-col flex-wrap gap-4 bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/20 dark:divide-gray-100/20 border-gray-900/20 dark:border-gray-100/20 rounded-lg py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col flex-wrap gap-4 px-4">
          <span className="font-bold text-xl">
            {lang === "en" ? <>Earn</> : <>Gagner</>}
          </span>
          <div>
            <span className="text-4xl font-bold text-green-500 dark:text-green-300">
              {APY}%{" "}
              <span className="text-base text-gray-700 dark:text-gray-300">
                APR
              </span>
            </span>
          </div>
          <div>
            <Period
              lang={lang}
              stakingPeriod={stakingPeriod as number}
              setStakingPeriod={setStakingPeriod}
            />
          </div>
          <div>
            <Amount
              lang={lang}
              amount={amount as number}
              setAmount={setAmount}
              amountError={amountError as string}
            />
          </div>
        </div>
        <div className="pt-4 px-4">
          <StakingData lang={lang} />
        </div>
        <div className="pt-4 px-4">
          <TotalStaked lang={lang} />
        </div>
        <div className="pt-4 px-4">
          <div className="grid grid-cols-2 gap-4">
            <ApproveButton lang={lang} amount={amount as number} />
            <StakingButton
              lang={lang}
              stakingPeriod={stakingPeriod as number}
              amount={amount as number}
            />

            <ClaimingButton lang={lang} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
