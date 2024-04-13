"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useSwitchChain,
  useBlockNumber,
  useTransactionConfirmations,
} from "wagmi";
import { trotelCoinStakingV2 } from "@/data/web3/addresses";
import trotelCoinStakingV2ABI from "@/abi/trotelCoinStakingV2";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";
import { Address, Hash, parseEther } from "viem";
import "animate.css";
import { polygon } from "wagmi/chains";
import BlueButton from "@/app/[lang]/components/blueButton";

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
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [stakeConfirmed, setStakeConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { switchChain } = useSwitchChain();

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
      },
    },
  });

  const { data: stakeConfirmation, refetch: refetchStakeConfirmation } =
    useTransactionConfirmations({
      hash: stakeHash as Hash,
      chainId: polygon.id,
    });

  useEffect(() => {
    if (stakeConfirmation && Number(stakeConfirmation) > 0 && !stakeConfirmed) {
      setStakeMessage(true);
      setStakeConfirmed(true);
      setIsLoading(false);
    }
  }, [stakeConfirmation]);

  const { data: getStakingDataNoTyped, refetch } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinStakingV2ABI,
    address: trotelCoinStakingV2,
    functionName: "stakings",
    args: [address as Address],
  });

  useEffect(() => {
    refetch();
    refetchStakeConfirmation();
  }, [blockNumber, address]);

  useEffect(() => {
    if (address && getStakingDataNoTyped) {
      const getStakingData = getStakingDataNoTyped as any[];
      setStakedTrotelCoins(getStakingData[0].toString());
    } else {
      setStakedTrotelCoins(0);
    }
  }, [getStakingDataNoTyped, address]);

  const stake = async (amount: number, stakingPeriod: number) => {
    if (!address) {
      setErrorMessage(true);
      return;
    }

    if (stakingPeriod <= 0) {
      setErrorMessage(true);
      return;
    }

    if (amount <= 0) {
      setErrorMessage(true);
      return;
    }

    if (stakedTrotelCoins > 0) {
      setErrorMessage(true);
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
      case 730:
        stakingDuration = 63072000;
        break;
      case 1460:
        stakingDuration = 126144000;
        break;
      default:
        stakingDuration = 0;
        break;
    }

    const stakingAmount = parseEther(amount.toString());

    await writeContractAsync({
      address: trotelCoinStakingV2,
      functionName: "stake",
      chainId: polygon.id,
      abi: trotelCoinStakingV2ABI,
      args: [stakingAmount, stakingDuration],
    }).catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!isLoading && address && !Boolean(amount) && stakedTrotelCoins <= 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address, stakedTrotelCoins, amount]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => stake(amount, stakingPeriod)}
        disabled={disabled}
        text={lang === "en" ? "Stake" : "Staker"}
        isLoading={isLoading}
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
    </>
  );
};

export default StakingButton;
