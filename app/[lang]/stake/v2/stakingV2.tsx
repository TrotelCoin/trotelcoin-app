import { Lang } from "@/types/language/lang";
import React, { useEffect, useState } from "react";
import { useAccount, useBlockNumber, useChainId, useReadContract } from "wagmi";
import Amount from "@/app/[lang]/stake/components/amount";
import { Address, formatEther } from "viem";
import { polygon } from "viem/chains";
import Period from "@/app/[lang]/stake/components/v2/period";
import StakingData from "@/app/[lang]/stake/components/v2/stakingData";
import TotalStaked from "@/app/[lang]/stake/components/v2/totalStaked";
import Wallet from "@/app/[lang]/components/header/wallet";
import ClaimingButton from "@/app/[lang]/stake/components/v2/buttons/claimingButton";
import ApproveButton from "@/app/[lang]/stake/components/v2/buttons/approveButton";
import IncreaseStakingButton from "@/app/[lang]/stake/components/v2/buttons/increaseStakingButton";
import StakingButton from "@/app/[lang]/stake/components/v2/buttons/stakingButton";
import trotelCoinStakingV2ABI from "@/abi/staking/trotelCoinStakingV2";
import { trotelCoinStakingV2, trotelCoinAddress } from "@/data/web3/addresses";
import trotelCoinABI from "@/abi/trotelcoin/trotelCoin";

const StakingV2 = ({
  lang,
  trotelPrice,
  showTrotelInUsdc,
  roundPrice,
  storedTrotelPrice
}: {
  lang: Lang;
  trotelPrice: number;
  showTrotelInUsdc: boolean;
  roundPrice: () => void;
  storedTrotelPrice: number;
}) => {
  const [chainError, setChainError] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [isMax, setIsMax] = useState<boolean>(false);
  const [APR, setAPR] = useState<number | null>(null);
  const [stakingPeriod, setStakingPeriod] = useState<number>(30);
  const [needApproval, setNeedApproval] = useState<boolean>(true);
  const [isStaking, setIsStaking] = useState<boolean>(false);

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id
  });

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
      case 730:
        setAPR(20);
        break;
      case 1460:
        setAPR(30);
        break;
      default:
        setAPR(0);
    }
  }, [stakingPeriod, APR]);

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    chainId: polygon.id,
    args: [address, trotelCoinStakingV2],
    abi: trotelCoinABI,
    address: trotelCoinAddress,
    functionName: "allowance"
  });

  useEffect(() => {
    if (allowanceData && amount) {
      const allowance = Number(formatEther(allowanceData as bigint));

      if (allowance >= amount) {
        setNeedApproval(false);
      } else {
        setNeedApproval(true);
      }
    } else {
      setNeedApproval(true);
    }
  }, [allowanceData, amount]);

  const { data: stakingsData, refetch: refetchStakings } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinStakingV2ABI,
    address: trotelCoinStakingV2,
    args: [address],
    functionName: "stakings"
  });

  useEffect(() => {
    if (stakingsData) {
      const stakedBalance = Number((stakingsData as any)[0]);

      if (stakedBalance > 0) {
        setIsStaking(true);
      }
    }
  }, [stakingsData]);

  useEffect(() => {
    refetchAllowance();
    refetchStakings();
  }, [blockNumber, refetchAllowance, refetchStakings]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
        <div className="flex w-full flex-col flex-wrap divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white py-4 text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex flex-col gap-4 px-4">
            <span className="text-4xl font-bold text-green-500 dark:text-green-300">
              {APR}%{" "}
              <span className="text-base text-gray-700 dark:text-gray-300">
                APR
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
                trotelPrice={trotelPrice}
                APR={APR}
                stakingPeriod={stakingPeriod}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col flex-wrap divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white py-4 text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="px-4 pb-4">
            <StakingData
              lang={lang}
              trotelPrice={trotelPrice}
              roundPrice={roundPrice}
              showTrotelInUsdc={showTrotelInUsdc}
            />
          </div>
          <div className="px-4 pt-4">
            <TotalStaked
              lang={lang}
              storedTrotelPrice={storedTrotelPrice}
              roundPrice={roundPrice}
            />
          </div>
        </div>

        <div className="mt-4 w-full">
          {address ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                {needApproval ? (
                  <ApproveButton
                    lang={lang}
                    amount={amount as number}
                    chainError={chainError}
                    setChainError={setChainError}
                    isMax={isMax}
                  />
                ) : isStaking ? (
                  <IncreaseStakingButton
                    lang={lang}
                    amount={amount as number}
                    chainError={chainError}
                    setChainError={setChainError}
                  />
                ) : (
                  <StakingButton
                    lang={lang}
                    stakingPeriod={stakingPeriod}
                    amount={amount as number}
                    chainError={chainError}
                    setChainError={setChainError}
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

export default StakingV2;
