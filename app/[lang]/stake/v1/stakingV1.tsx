import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import StakingData from "@/app/[lang]/stake/components/v1/stakingData";
import ClaimingButton from "@/app/[lang]/stake/components/v1/buttons/claimingButton";
import TotalStaked from "@/app/[lang]/stake/components/v1/totalStaked";
import { polygon } from "viem/chains";
import { useAccount, useChainId } from "wagmi";
import Wallet from "@/app/[lang]/components/header/wallet";
import "animate.css";

const StakingV1 = ({
  lang,
  trotelPrice,
  showTrotelInUsdc,
  roundPrice,
  storedTrotelCoin,
}: {
  lang: Lang;
  trotelPrice: number;
  showTrotelInUsdc: boolean;
  roundPrice: () => void;
  storedTrotelCoin: number;
}) => {
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
        <div className="w-[448px] mt-4 flex flex-col flex-wrap bg-white border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="px-4 pb-4 w-full">
            <StakingData
              lang={lang}
              trotelPrice={trotelPrice}
              roundPrice={roundPrice}
              showTrotelInUsdc={showTrotelInUsdc}
            />
          </div>
          <div className="pt-4 px-4 w-full">
            <TotalStaked
              lang={lang}
              storedTrotelPrice={storedTrotelPrice}
              roundPrice={roundPrice}
            />
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
