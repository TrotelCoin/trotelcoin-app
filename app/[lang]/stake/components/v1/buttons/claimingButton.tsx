"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useBlockNumber,
  useBlock,
  useTransactionConfirmations
} from "wagmi";
import { Address, Hash } from "viem";
import contracts from "@/data/web3/addresses";
import abis from "@/abis/abis";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
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
      setClaimConfirmed(true);
      setIsLoading(false);
    }
  }, [claimConfirmation, claimConfirmed]);

  const { data: getStakingDataNoTyped, refetch: refetchStakings } =
    useReadContract({
      address: contracts[chain.id].trotelCoinStakingV1,
      abi: abis[chain.id].trotelCoinStakingV1,
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

      const timeLeft = startTime + duration - timestamp;

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
      abi: abis[chain.id].trotelCoinStakingV1,
      address: contracts[chain.id].trotelCoinStakingV1,
      functionName: "unstake",
      chainId: chain.id,
      args: []
    });
  };

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => claim()}
        isLoading={isPending || isLoading}
        disabled={disabled || isLoading}
        text={lang === "en" ? "Claim" : "Réclamer"}
      />

      <SuccessNotification
        display={claimMessage}
        lang={lang}
        onClose={() => setClaimMessage(false)}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You have claimed your rewards"
            : "Vous avez réclamé vos récompenses"
        }
      />
      <FailNotification
        display={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={lang === "en" ? "There was an error" : "Il y a eu une erreur"}
      />
      <FailNotification
        display={chainError && Boolean(address)}
        onClose={() => {
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
