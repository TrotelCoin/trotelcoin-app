"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useSwitchChain,
  useBlockNumber,
  useBlock,
  useTransactionConfirmations
} from "wagmi";
import { Address, Hash } from "viem";
import { contracts } from "@/data/web3/addresses";
import trotelCoinStakingV2ABI from "@/abi/polygon/staking/trotelCoinStakingV2";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import "animate.css";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import ChainContext from "@/contexts/chain";

const ClaimingButton = ({
  lang,
  chainError,
  setChainError
}: {
  lang: Lang;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [claimMessage, setClaimMessage] = useState<boolean>(false);
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number | null>(
    null
  );
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [claimConfirmed, setClaimConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });
  const { data: block } = useBlock({
    chainId: chain.id,
    blockNumber: blockNumber
  });

  const {
    writeContractAsync,
    isPending,
    data: claimHash
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setClaimConfirmed(false);
        setIsLoading(true);
      },
      onMutate: () => {
        setIsLoading(true);
      },
      onError: () => {
        setErrorMessage(true);
        setIsLoading(false);
      }
    }
  });

  const { data: claimConfirmation, refetch: refetchClaimConfirmation } =
    useTransactionConfirmations({
      chainId: chain.id,
      hash: claimHash as Hash
    });

  useEffect(() => {
    if (claimConfirmation && Number(claimConfirmation) > 0 && !claimConfirmed) {
      setClaimMessage(true);
      setIsLoading(false);
      setClaimConfirmed(true);
    }
  }, [claimConfirmation, claimConfirmed]);

  const { data: getStakingDataNoTyped, refetch: refetchStakings } =
    useReadContract({
      address: contracts[chain.id].trotelCoinStakingV2,
      abi: trotelCoinStakingV2ABI,
      chainId: chain.id,
      functionName: "stakings",
      args: [address as Address]
    });

  useEffect(() => {
    refetchStakings();
    refetchClaimConfirmation();
  }, [blockNumber, address, refetchStakings, refetchClaimConfirmation]);

  useEffect(() => {
    let timestamp;

    if (block) {
      timestamp = Number(block.timestamp);
    }

    if (getStakingDataNoTyped && address && timestamp) {
      const getStakingData = getStakingDataNoTyped as any[];
      const stakedTrotelCoins = Number(getStakingData[0]);
      const startTime = Number(getStakingData[1]);
      const duration = Number(getStakingData[2]);
      let timeLeft: number = 0;
      if (startTime && duration) {
        timeLeft = startTime + duration - timestamp;
      }

      setStakedTrotelCoins(stakedTrotelCoins);
      setTimeLeft(Math.max(0, timeLeft));

      const interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev ? prev - 1 : 0));
      }, 1000);

      const enabled =
        address &&
        !!stakedTrotelCoins &&
        stakedTrotelCoins > 0 &&
        !!timeLeft &&
        timeLeft <= 0;

      if (enabled) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }

      return () => clearInterval(interval);
    } else {
      setStakedTrotelCoins(0);
      setTimeLeft(0);
    }
  }, [getStakingDataNoTyped, address, block]);

  const claim = async () => {
    if (!stakedTrotelCoins || stakedTrotelCoins <= 0) {
      setErrorMessage(true);
      return;
    }

    if (timeLeft && timeLeft > 0) {
      setErrorMessage(true);
      return;
    }

    await writeContractAsync({
      address: contracts[chain.id].trotelCoinStakingV2,
      functionName: "unstake",
      chainId: chain.id,
      abi: trotelCoinStakingV2ABI
    });
  };

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => claim()}
        isLoading={isLoading || isPending}
        disabled={disabled || isLoading}
        text={lang === "en" ? "Claim" : "Réclamer"}
      />

      <Success
        show={claimMessage}
        lang={lang}
        onClose={() => setClaimMessage(false)}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You have claimed your rewards"
            : "Vous avez réclamé vos récompenses"
        }
      />
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={lang === "en" ? "There was an error" : "Il y a eu une erreur"}
      />
      <Fail
        show={chainError && Boolean(address)}
        onClose={() => {
          switchChain({ chainId: chain.id });
          setChainError(false);
        }}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You are on the wrong network"
            : "Vous êtes sur le mauvais réseau"
        }
      />
    </>
  );
};

export default ClaimingButton;
