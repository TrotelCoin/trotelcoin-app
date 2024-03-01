"use client";

import { Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useContractRead,
  Chain,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import { Address, parseEther } from "viem";
import "animate.css";
import { BigNumber } from "ethers";
import { polygon } from "wagmi/chains";

const StakingButton = ({
  lang,
  stakingPeriod,
  amount,
  chainError,
  setChainError,
}: {
  lang: Lang;
  stakingPeriod: number;
  amount: number;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
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

  const switchChain = useSwitchChain();

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
        stakingDuration = 15724800;
        break;
      case 365:
        stakingDuration = 31536000;
        break;
      default:
        stakingDuration = 0;
    }

    const stakingAmount = BigNumber.from(
      parseEther(amount.toString()).toString()
    );

    try {
      await mutateAsync({
        args: [stakingAmount, stakingDuration],
      });
    } catch (error) {
      console.error(error);
    }
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
        className="!bg-blue-500 hover:!bg-blue-400 focus:!border-blue-500 !text-sm !px-6 !py-2 !text-gray-100 !rounded-xl !font-semibold"
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
            : "Vous avez staké vos TrotelCoins"
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
            : "Vous devez sélectionner une période de staking"
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
            : "Vous stakez déjà des TrotelCoins"
        }
      />
      <Fail
        show={errorMessage}
        lang={lang}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "Your transaction failed"
            : "Votre transaction a échoué"
        }
      />
      <Fail
        show={chainError && Boolean(address)}
        lang={lang}
        onClose={() => {
          switchChain(polygon.id);
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

export default StakingButton;
