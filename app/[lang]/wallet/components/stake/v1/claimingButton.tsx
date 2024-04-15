"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useSwitchChain,
  useBlockNumber,
  useBlock,
  useTransactionConfirmations,
} from "wagmi";
import { Address, Hash } from "viem";
import { trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import "animate.css";
import { polygon } from "viem/chains";
import BlueButton from "@/app/[lang]/components/blueButton";

const ClaimingButton = ({
  lang,
  chainError,
  setChainError,
}: {
  lang: Lang;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [claimMessage, setClaimMessage] = useState<boolean>(false);
  const [noStakedMessage, setNoStakedMessage] = useState<boolean>(false);
  const [timeNotFinishedMessage, setTimeNotFinishedMessage] =
    useState<boolean>(false);
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [blockFetched, setBlockFetched] = useState<boolean>(false);
  const [claimConfirmed, setClaimConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });
  const { data: block } = useBlock({
    chainId: polygon.id,
    blockNumber: blockNumber,
  });

  const {
    writeContractAsync,
    isPending,
    data: claimHash,
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
      },
    },
  });

  const { data: claimConfirmation, refetch: refetchClaimConfirmation } =
    useTransactionConfirmations({
      chainId: polygon.id,
      hash: claimHash as Hash,
    });

  useEffect(() => {
    if (claimConfirmation && Number(claimConfirmation) > 0 && !claimConfirmed) {
      setClaimMessage(true);
      setIsLoading(false);
    }
  }, [claimConfirmation]);

  const { data: getStakingDataNoTyped, refetch: refetchStakings } =
    useReadContract({
      address: trotelCoinStakingV1,
      abi: trotelCoinStakingV1ABI,
      chainId: polygon.id,
      functionName: "stakings",
      args: [address as Address],
    });

  useEffect(() => {
    refetchStakings();
    refetchClaimConfirmation();
  }, [blockNumber, address]);

  useEffect(() => {
    if (block && !blockFetched) {
      const timestamp = Number(block.timestamp);
      setTimestamp(timestamp);
      setBlockFetched(true);
    }
  }, [block]);

  useEffect(() => {
    if (getStakingDataNoTyped && address) {
      const getStakingData = getStakingDataNoTyped as any[];
      const stakedTrotelCoins = Number(getStakingData[0]);
      const startTime = Number(getStakingData[1]);
      const duration = Number(getStakingData[2]);

      const timeLeft = startTime + duration - (timestamp as number);

      setStakedTrotelCoins(stakedTrotelCoins);
      setTimeLeft(Math.max(0, timeLeft));

      const interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setStakedTrotelCoins(0);
      setTimeLeft(0);
    }
  }, [getStakingDataNoTyped, address, timestamp]);

  const claim = async () => {
    if (!stakedTrotelCoins || stakedTrotelCoins <= 0) {
      setErrorMessage(true);
      return;
    }

    if (timeLeft > 0) {
      setErrorMessage(true);
      return;
    }

    await writeContractAsync({
      address: trotelCoinStakingV1,
      functionName: "unstake",
      chainId: polygon.id,
      abi: trotelCoinStakingV1ABI,
    });
  };

  useEffect(() => {
    if (address && stakedTrotelCoins > 0 && timeLeft <= 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [stakedTrotelCoins, timeLeft, address]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => claim()}
        isLoading={isPending || isLoading}
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
          switchChain({ chainId: polygon.id });
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
