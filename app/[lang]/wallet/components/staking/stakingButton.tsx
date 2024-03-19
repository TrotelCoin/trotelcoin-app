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
import { trotelCoinStakingV1 } from "@/data/web3/addresses";
import trotelCoinStakingV1ABI from "@/abi/trotelCoinStakingV1";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import { Address, parseEther } from "viem";
import "animate.css";
import { polygon } from "wagmi/chains";
import BlueButton from "@/app/[lang]/components/blueButton";

const StakingButton = ({
  lang,
  stakingPeriod,
  amount,
  chainError,
  setChainError,
  allowance,
}: {
  lang: Lang;
  stakingPeriod: number;
  amount: number;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
  allowance: number;
}) => {
  const [stakeMessage, setStakeMessage] = useState<boolean>(false);
  const [stakingPeriodMessage, setStakingPeriodMessage] =
    useState<boolean>(false);
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number>(0);
  const [alreadyStakingMessage, setAlreadyStakingMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [notConnected, setNotConnected] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { switchChain } = useSwitchChain();

  const { writeContractAsync, isPending } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setStakeMessage(true);
      },
      onError: () => {
        setErrorMessage(true);
      },
    },
  });

  const { data: getStakingDataNoTyped, refetch } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinStakingV1ABI,
    address: trotelCoinStakingV1,
    functionName: "stakings",
    args: [address as Address],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, address]);

  useEffect(() => {
    if (stakingPeriod <= 0) {
      setStakingPeriodMessage(true);
    }
  }, [stakingPeriod]);

  let getStakingData = getStakingDataNoTyped as any[];

  useEffect(() => {
    if (getStakingDataNoTyped) {
      getStakingData = getStakingDataNoTyped as any[];
    }
  }, [getStakingData, address]);

  useEffect(() => {
    if (address && getStakingData) {
      setStakedTrotelCoins(getStakingData[0].toString());
    } else {
      setStakedTrotelCoins(0);
    }
  }, [getStakingData, address]);

  const stake = async (amount: number, stakingPeriod: number) => {
    if (!address) {
      setNotConnected(true);
      return;
    }

    if (stakingPeriod <= 0) {
      setStakingPeriodMessage(true);
      return;
    }

    if (amount <= 0) {
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

    const stakingAmount = parseEther(amount.toString());

    try {
      await writeContractAsync({
        address: trotelCoinStakingV1,
        functionName: "stake",
        chainId: polygon.id,
        abi: trotelCoinStakingV1ABI,
        args: [stakingAmount, stakingDuration],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (amount && address && allowance >= amount && stakedTrotelCoins <= 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amount, address, allowance, stakedTrotelCoins]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => stake(amount, stakingPeriod)}
        disabled={disabled}
        text={lang === "en" ? "Stake" : "Staker"}
        isLoading={isPending}
      />
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
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "Your transaction failed, make sure you approved first"
            : "Votre transaction a échoué, assurez-vous d'avoir approuvé d'abord"
        }
      />
      <Fail
        show={chainError && Boolean(address)}
        lang={lang}
        onClose={() => {
          switchChain({ chainId: polygon.id });
          setChainError(false);
        }}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You are on the wrong network"
            : "Vous êtes sur le mauvais réseau"
        }
      />
      <Fail
        show={notConnected}
        lang={lang}
        onClose={() => setNotConnected(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "You are not connected" : "Vous n'êtes pas connecté"
        }
      />
    </>
  );
};

export default StakingButton;
