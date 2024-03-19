"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useSwitchChain,
  useBlockNumber,
} from "wagmi";
import { Address } from "viem";
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

  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { writeContractAsync, isSuccess, isPending, isError } =
    useWriteContract();

  const { data: getUserStakingDataNoTyped, refetch: refetchStakingDetails } =
    useReadContract({
      address: trotelCoinStakingV1,
      abi: trotelCoinStakingV1ABI,
      chainId: polygon.id,
      functionName: "getUserStakingDetails",
      args: [address as Address],
    });

  const { data: getStakingDataNoTyped, refetch: refetchStakings } =
    useReadContract({
      address: trotelCoinStakingV1,
      abi: trotelCoinStakingV1ABI,
      chainId: polygon.id,
      functionName: "stakings",
      args: [address as Address],
    });

  let getStakingData = getStakingDataNoTyped as any[];

  useEffect(() => {
    if (getStakingDataNoTyped) {
      getStakingData = getStakingDataNoTyped as any[];
    }
  }, [getStakingData, address]);

  let getUserStakingData = getUserStakingDataNoTyped as any[];

  useEffect(() => {
    if (getUserStakingDataNoTyped) {
      getUserStakingData = getUserStakingDataNoTyped as any[];
    }
  }, [getUserStakingData, address]);

  useEffect(() => {
    refetchStakingDetails();
    refetchStakings();
  }, [blockNumber, address]);

  useEffect(() => {
    if (getUserStakingData && address) {
      setTimeLeft(getUserStakingData[1].toString());
    } else {
      setTimeLeft(0);
    }
  }, [getUserStakingData, address]);

  useEffect(() => {
    if (isError) {
      setErrorMessage(true);
    }
  }, [isError]);

  useEffect(() => {
    if (getStakingData && address) {
      setStakedTrotelCoins(getStakingData[0].toString());
    } else {
      setStakedTrotelCoins(0);
    }
  }, [getStakingData, address]);

  const claim = async () => {
    if (!stakedTrotelCoins || stakedTrotelCoins <= 0) {
      setNoStakedMessage(true);
      return;
    }

    if (!timeLeft || timeLeft > 0) {
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
    if (isSuccess) {
      setClaimMessage(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (
      address &&
      stakedTrotelCoins &&
      stakedTrotelCoins > 0 &&
      timeLeft &&
      timeLeft <= 0
    ) {
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
