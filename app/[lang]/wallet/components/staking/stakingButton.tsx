"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import { Address, parseEther } from "viem";
import "animate.css";

const StakingButton = ({
  lang,
  stakingPeriod,
  amount,
}: {
  lang: Lang;
  stakingPeriod: number;
  amount: number;
}) => {
  const [stakeMessage, setStakeMessage] = useState<boolean>(false);
  const [stakingPeriodMessage, setStakingPeriodMessage] =
    useState<boolean>(false);
  const [amountMessage, setAmountMessage] = useState<boolean>(false);
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number>(0);
  const [alreadyStakingMessage, setAlreadyStakingMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const address = useAddress();

  const { contract } = useContract(trotelCoinStakingV1, trotelCoinStakingV1ABI);

  const { mutateAsync, isSuccess, isLoading, isError } = useContractWrite(
    contract,
    "stake"
  );

  const { data: getStakingData } = useContractRead(contract, "stakings", [
    address as Address,
  ]);

  useEffect(() => {
    if (stakingPeriod <= 0) {
      setStakingPeriodMessage(true);
    }
  }, [stakingPeriod]);

  useEffect(() => {
    if (isError) {
      setErrorMessage(true);
    }
  }, [isError]);

  useEffect(() => {
    if (address && getStakingData) {
      setStakedTrotelCoins(getStakingData[0].toString());
    } else {
      setStakedTrotelCoins(0);
    }
  }, [getStakingData, address]);

  const stake = async (amount: number, stakingPeriod: number) => {
    if (stakingPeriod <= 0) {
      setStakingPeriodMessage(true);
      return;
    }

    if (amount <= 0) {
      setAmountMessage(true);
      return;
    }

    if (stakedTrotelCoins > 0) {
      setAlreadyStakingMessage(true);
      return;
    }

    let stakingDuration = 0;

    switch (stakingPeriod) {
      case 30:
        stakingDuration = 2592000;
        break;
      case 91:
        stakingDuration = 7862400;
        break;
      case 182:
        stakingDuration = 16588800;
        break;
      case 365:
        stakingDuration = 31536000;
        break;
      default:
        stakingDuration = 0;
    }

    const stakingAmount = parseEther(amount.toString());

    await mutateAsync({
      args: [stakingAmount, stakingDuration],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setStakeMessage(true);
    }
  }, [isSuccess]);

  return (
    <>
      <button
        onClick={() => stake(amount, stakingPeriod)}
        className="!bg-blue-500 hover:!bg-blue-400 dark:!bg-blue-300 dark:hover:!bg-blue-400 focus:!border-blue-500 dark:focus:!border-blue-300 !text-sm !px-6 !py-2 !text-gray-100 dark:!text-gray-900 !rounded-lg !font-semibold"
        style={{}}
      >
        {isLoading ? (
          <span className="animate__animated animate__slower animate__flash animate__infinite">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </span>
        ) : (
          <>{lang === "en" ? "Lock" : "Bloquer"}</>
        )}
      </button>
      <Success
        show={stakeMessage}
        lang={lang}
        onClose={() => setStakeMessage(false)}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You have staked your TrotelCoins"
            : "Tu as staké tes TrotelCoins"
        }
      />
      <Fail
        show={stakingPeriodMessage}
        lang={lang}
        onClose={() => setStakingPeriodMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You need to select a staking period"
            : "Tu dois sélectionner une période de staking"
        }
      />
      <Fail
        show={amountMessage}
        lang={lang}
        onClose={() => setAmountMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "The amount must be positive"
            : "Le montant doit être positif"
        }
      />
      <Fail
        show={alreadyStakingMessage}
        lang={lang}
        onClose={() => setAlreadyStakingMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You are already staking TrotelCoins"
            : "Tu stakes déjà des TrotelCoins"
        }
      />
      <Fail
        show={errorMessage}
        lang={lang}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "Your transaction failed" : "Ta transaction a échoué"
        }
      />
    </>
  );
};

export default StakingButton;
