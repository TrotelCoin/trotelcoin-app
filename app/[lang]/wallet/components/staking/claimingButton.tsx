"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { Address } from "viem";
import { trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import "animate.css";

const ClaimingButton = ({ lang }: { lang: Lang }) => {
  const [claimMessage, setClaimMessage] = useState<boolean>(false);
  const [noStakedMessage, setNoStakedMessage] = useState<boolean>(false);
  const [timeNotFinishedMessage, setTimeNotFinishedMessage] =
    useState<boolean>(false);
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const address = useAddress();

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
      <button
        onClick={() => claim()}
        className="!bg-blue-500 hover:!bg-blue-400 dark:!bg-blue-300 dark:hover:!bg-blue-400 focus:!border-blue-500 dark:focus:!border-blue-300 !text-sm !px-6 !py-2 !text-gray-100 dark:!text-gray-900 !rounded-lg !font-semibold"
        style={{}}
      >
        {isLoading ? (
          <span className="animate__animated animate__slower animate__flash animate__infinite">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </span>
        ) : (
          <>{lang === "en" ? "Claim" : "Réclamer"}</>
        )}
      </button>
      <Success
        show={claimMessage}
        lang={lang}
        onClose={() => setClaimMessage(false)}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You have claimed your rewards"
            : "Tu as réclamé tes récompenses"
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
            : "Tu ne peux pas encore réclamer tes récompenses"
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
            : "Tu n'as pas de TrotelCoins en staking"
        }
      />
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "There was an error claiming your rewards"
            : "Il y a eu une erreur en réclamant tes récompenses"
        }
      />
    </>
  );
};

export default ClaimingButton;
