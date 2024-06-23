"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useBlockNumber,
  useTransactionConfirmations,
  useBlock,
  useReadContract
} from "wagmi";
import { contracts } from "@/data/web3/addresses";
import trotelCoinStakingV2ABI from "@/abi/polygon/staking/trotelCoinStakingV2";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { Address, Hash, parseEther } from "viem";
import "animate.css";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import ChainContext from "@/contexts/chain";

const IncreaseStakingButton = ({
  lang,
  amount,
  chainError,
  setChainError
}: {
  lang: Lang;
  amount: number;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [stakeMessage, setStakeMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [stakeConfirmed, setStakeConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [blockFetched, setBlockFetched] = useState<boolean>(false);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data: block } = useBlock({
    chainId: chain.id,
    blockNumber: blockNumber
  });

  const { data: getStakingDataNoTyped, refetch: refetchStakings } =
    useReadContract({
      address: contracts[chain.id].trotelCoinStakingV2,
      abi: trotelCoinStakingV2ABI,
      chainId: chain.id,
      functionName: "stakings",
      args: [address as Address]
    });

  useEffect(() => {
    if (block && !blockFetched) {
      const timestamp = Number(block.timestamp);
      setTimestamp(timestamp);
      setBlockFetched(true);
    }
  }, [block, blockFetched]);

  useEffect(() => {
    if (timestamp && address) {
      const getStakingData = getStakingDataNoTyped as any[];
      const startTime = Number(getStakingData[1]);
      const duration = Number(getStakingData[2]);
      let timeLeft: number = 0;
      if (startTime && duration && timestamp) {
        timeLeft = startTime + duration - timestamp;
      }

      setTimeLeft(Math.max(0, timeLeft));

      const interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeLeft(0);
    }
  }, [timestamp, address, getStakingDataNoTyped]);

  const { writeContractAsync, data: stakeHash } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setStakeConfirmed(false);
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

  const { data: stakeConfirmation, refetch: refetchStakeConfirmation } =
    useTransactionConfirmations({
      hash: stakeHash as Hash,
      chainId: chain.id
    });

  useEffect(() => {
    if (stakeConfirmation && Number(stakeConfirmation) > 0 && !stakeConfirmed) {
      setStakeMessage(true);
      setStakeConfirmed(true);
      setIsLoading(false);
    }
  }, [stakeConfirmation, stakeConfirmed]);

  useEffect(() => {
    refetchStakings();
    refetchStakeConfirmation();
  }, [blockNumber, address, refetchStakeConfirmation, refetchStakings]);

  const increaseStake = async (amount: number) => {
    if (!address) {
      setErrorMessage(true);
      return;
    }

    if (amount <= 0) {
      setErrorMessage(true);
      return;
    }

    const stakingAmount = parseEther(amount.toFixed(18));

    await writeContractAsync({
      address: contracts[chain.id].trotelCoinStakingV2,
      functionName: "increaseStaking",
      chainId: chain.id,
      abi: trotelCoinStakingV2ABI,
      args: [stakingAmount]
    });
  };

  useEffect(() => {
    if (!isLoading && address && Boolean(amount) && timeLeft && timeLeft > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amount, address, isLoading, timeLeft]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => increaseStake(amount)}
        disabled={disabled}
        text={lang === "en" ? "Increase staking" : "Augmentez votre mise"}
        isLoading={isLoading}
      />
      <SuccessNotification
        display={stakeMessage}
        lang={lang}
        onClose={() => setStakeMessage(false)}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You have increased your staked TrotelCoins"
            : "Vous avez augmentez vos TrotelCoins staké"
        }
      />
      <FailNotification
        display={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "Your transaction failed, make sure you approved first"
            : "Votre transaction a échoué, assurez-vous d'avoir approuvé d'abord"
        }
      />
      <FailNotification
        display={chainError && Boolean(address)}
        lang={lang}
        onClose={() => {
          setChainError(false);
        }}
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

export default IncreaseStakingButton;
