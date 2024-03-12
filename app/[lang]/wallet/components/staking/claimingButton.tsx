"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useContractRead,
  useSwitchChain,
} from "@thirdweb-dev/react";
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

  const address = useAddress();
  const switchChain = useSwitchChain();

  const { contract } = useContract(trotelCoinStakingV1, trotelCoinStakingV1ABI);

  const { mutateAsync, isSuccess, isLoading, isError } = useContractWrite(
    contract,
    "unstake"
  );

  const { data: getUserStakingData } = useContractRead(
    contract,
    "getUserStakingDetails",
    [address as Address]
  );

  const { data: getStakingData } = useContractRead(contract, "stakings", [
    address as Address,
  ]);

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
      await mutateAsync({ args: [] });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setClaimMessage(true);
    }
  }, [isSuccess]);

  return (
    <>
      <BlueButton
        onClick={() => claim()}
        isLoading={isLoading}
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
          switchChain(polygon.id);
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
