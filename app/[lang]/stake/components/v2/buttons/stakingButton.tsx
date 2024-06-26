"use client";

import type { Lang } from "@/types/language/lang";
import React, { useContext, useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useBlockNumber,
  useTransactionConfirmations
} from "wagmi";
import { getContractAddress } from "@/data/web3/addresses";
import { getAbi } from "@/abis/abis";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { Address, Hash, parseEther } from "viem";
import "animate.css";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import ChainContext from "@/contexts/chain";
import axios from "axios";
import TrotelPriceContext from "@/contexts/trotelPrice";

const StakingButton = ({
  lang,
  stakingPeriod,
  amount
}: {
  lang: Lang;
  stakingPeriod: number;
  amount: number;
}) => {
  const [stakeMessage, setStakeMessage] = useState<boolean>(false);
  const [stakedTrotelCoins, setStakedTrotelCoins] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [stakeConfirmed, setStakeConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { chain } = useContext(ChainContext);
  const { trotelPrice } = useContext(TrotelPriceContext);

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
      }
    }
  });

  const { data: stakeConfirmation, refetch: refetchStakeConfirmation } =
    useTransactionConfirmations({
      hash: stakeHash as Hash,
      chainId: chain.id
    });

  useEffect(() => {
    if (stakeConfirmation && Number(stakeConfirmation) > 0 && !stakeConfirmed) {
      setStakeMessage(true);
      setStakeConfirmed(true);
      setIsLoading(false);
    }
  }, [stakeConfirmation, stakeConfirmed]);

  const { data: getStakingDataNoTyped, refetch } = useReadContract({
    chainId: chain.id,
    abi: getAbi(chain.id, "trotelCoinStakingV2"),
    address: getContractAddress(chain.id, "trotelCoinStakingV2"),
    functionName: "stakings",
    args: [address as Address]
  });

  useEffect(() => {
    refetch();
    refetchStakeConfirmation();
  }, [blockNumber, address, refetch, refetchStakeConfirmation]);

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

    if (stakedTrotelCoins && stakedTrotelCoins > 0) {
      setErrorMessage(true);
      return;
    }

    let stakingDuration = 0;

    switch (stakingPeriod) {
      case 5:
        stakingDuration = 300;
        break;
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

    const stakingAmount = parseEther(amount.toFixed(18));

    await writeContractAsync({
      address: getContractAddress(chain.id, "trotelCoinStakingV2"),
      functionName: "stake",
      chainId: chain.id,
      abi: getAbi(chain.id, "trotelCoinStakingV2"),
      args: [stakingAmount, stakingDuration]
    });

    await axios
      .post(
        "/api/events/staking/stake",
        {
          wallet: address,
          amount: amount,
          duration: stakingDuration,
          trotelPrice: trotelPrice,
          chainId: chain.id
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (
      !isLoading &&
      address &&
      amount &&
      stakedTrotelCoins &&
      stakedTrotelCoins <= 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address, stakedTrotelCoins, amount, isLoading]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => stake(amount, stakingPeriod)}
        disabled={disabled}
        text={lang === "en" ? "Stake" : "Staker"}
        isLoading={isLoading}
      />
      <SuccessNotification
        display={stakeMessage}
        lang={lang}
        onClose={() => setStakeMessage(false)}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You have staked your TrotelCoins"
            : "Vous avez staké vos TrotelCoins"
        }
      />
      <FailNotification
        display={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "Your transaction failed, make sure you approved first"
            : "Votre transaction a échoué, assurez-vous d'avoir approuvé d'abord"
        }
      />
    </>
  );
};

export default StakingButton;
