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
} from "wagmi";
import { Address } from "viem";
import { trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinStakingV1ABI from "@/abi/staking/trotelCoinStakingV1";
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

  const { writeContractAsync, isPending } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setClaimMessage(true);
      },
      onError: () => {
        setErrorMessage(true);
      },
    },
  });

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
      setNoStakedMessage(true);
      return;
    }

    if (timeLeft > 0) {
      setTimeNotFinishedMessage(true);
      return;
    }

    try {
      await writeContractAsync({
        address: trotelCoinStakingV1,
        functionName: "unstake",
        chainId: polygon.id,
        abi: trotelCoinStakingV1ABI,
      });
    } catch (error) {
      console.error(error);
    }
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
        isLoading={isPending}
        disabled={disabled}
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
        show={timeNotFinishedMessage}
        lang={lang}
        onClose={() => setTimeNotFinishedMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You can't claim your rewards yet"
            : "Vous ne pouvez pas encore réclamer vos récompenses"
        }
      />
      <Fail
        show={noStakedMessage}
        lang={lang}
        onClose={() => setNoStakedMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You have no staked TrotelCoins"
            : "Vous n'avez pas de TrotelCoins en staking"
        }
      />
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "There was an error claiming your rewards, you should have at least 0.02 MATIC"
            : "Il y a eu une erreur en réclamant vos récompenses, vous devez avoir au moins 0.02 MATIC"
        }
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
