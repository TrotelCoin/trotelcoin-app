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
import { Address, Hash, formatEther } from "viem";
import { getContractAddress } from "@/data/web3/addresses";
import { getAbi } from "@/abis/abis";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import "animate.css";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import ChainContext from "@/contexts/chain";
import axios from "axios";
import TrotelPriceContext from "@/contexts/trotelPrice";

const ClaimingButton = ({ lang }: { lang: Lang }) => {
  const [claimMessage, setClaimMessage] = useState<boolean>(false);
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number | null>(
    null
  );
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [claimConfirmed, setClaimConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rewards, setRewards] = useState<number | null>(null);

  const { address } = useAccount();

  const { chain } = useContext(ChainContext);
  const { trotelPrice } = useContext(TrotelPriceContext);

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
      address: getContractAddress(chain.id, "trotelCoinStakingV1"),
      abi: getAbi(chain.id, "trotelCoinStakingV1"),
      chainId: chain.id,
      functionName: "stakings",
      args: [address as Address]
    });

  const { data: getStakingUserDataNoTyped, refetch: refetchUserStakings } =
    useReadContract({
      address: getContractAddress(chain.id, "trotelCoinStakingV1"),
      abi: getAbi(chain.id, "trotelCoinStakingV1"),
      chainId: chain.id,
      functionName: "getUserStakingsDetails",
      args: [address as Address]
    });

  useEffect(() => {
    refetchStakings();
    refetchClaimConfirmation();
    refetchUserStakings();
  }, [
    blockNumber,
    address,
    refetchStakings,
    refetchClaimConfirmation,
    refetchUserStakings
  ]);

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

      if (getStakingUserDataNoTyped) {
        const rewards = Number((getStakingUserDataNoTyped as any[])[1]);
        setRewards(rewards);
      }

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
  }, [getStakingDataNoTyped, address, block, getStakingUserDataNoTyped]);

  const claim = async () => {
    if (!address) {
      setErrorMessage(true);
      return;
    }

    if (!stakedTrotelCoins || stakedTrotelCoins <= 0) {
      setErrorMessage(true);
      return;
    }

    if (timeLeft && timeLeft > 0) {
      setErrorMessage(true);
      return;
    }

    await writeContractAsync({
      abi: getAbi(chain.id, "trotelCoinStakingV1"),
      address: getContractAddress(chain.id, "trotelCoinStakingV1"),
      functionName: "unstake",
      chainId: chain.id,
      args: []
    });

    await axios
      .post("/api/events/staking/unstake", {
        wallet: address,
        amount: formatEther(BigInt(stakedTrotelCoins)),
        reward: rewards ? formatEther(BigInt(rewards)) : null,
        trotelPrice: trotelPrice,
        chainId: chain.id
      })
      .catch((error) => {
        console.error(error);
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
    </>
  );
};

export default ClaimingButton;
