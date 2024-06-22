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
  storedTrotelPrice
}: {
  lang: Lang;
  trotelPrice: number;
  showTrotelInUsdc: boolean;
  storedTrotelPrice: number;
}) => {
  const [chainError, setChainError] = useState<boolean>(false);

  const { address } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    if (chainId !== polygon.id) {
      setChainError(true);
    } else {
      setChainError(false);
    }
  }, [chainId]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
        <div className="flex w-full flex-col flex-wrap divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white py-4 text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="w-full px-4 pb-4">
            <StakingData
              lang={lang}
              trotelPrice={trotelPrice}
              showTrotelInUsdc={showTrotelInUsdc}
            />
          </div>
          <div className="w-full px-4 pt-4">
            <TotalStaked lang={lang} storedTrotelPrice={storedTrotelPrice} />
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
