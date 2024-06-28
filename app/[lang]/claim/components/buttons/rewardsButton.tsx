"use client";

import type { Lang } from "@/types/language/lang";
import {
  useAccount,
  useSendTransaction,
  useTransactionConfirmations,
  useBlockNumber
} from "wagmi";
import React, { useContext, useEffect, useState } from "react";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { Address, Hash, parseEther } from "viem";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import "animate.css";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import axios from "axios";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import ChainContext from "@/contexts/chain";
import TrotelPriceContext from "@/contexts/trotelPrice";
import claimingRewardsFee from "@/data/rewards/claimingFee";

const RewardsButton = ({
  lang,
  centralWalletAddress,
  chainError,
  setChainError,
  timeLeft,
  isWeeklyReserveEmpty
}: {
  lang: Lang;
  centralWalletAddress: Address;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
  timeLeft: number | null;
  isWeeklyReserveEmpty: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableToClaim, setAvailableToClaim] = useState<number | null>(null);
  const [nothingToClaimMessage, setNothingToClaimMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [noAddressMessage, setNoAddressMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [transactionHash, setTransactionHash] = useState<Hash | null>(null);
  const [transactionConfirmed, setTransactionConfirmed] =
    useState<boolean>(false);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);
  const { trotelPrice } = useContext(TrotelPriceContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const {
    data: transactionConfirmation,
    refetch: refetchTransactionConfirmation
  } = useTransactionConfirmations({
    chainId: chain.id,
    hash: transactionHash as Hash
  });

  const { sendTransactionAsync, isError } = useSendTransaction({
    mutation: {
      onSuccess: () => {
        setTransactionConfirmed(false);
      },
      onError: () => {
        setErrorMessage(true);
        setIsLoading(false);
      }
    }
  });

  useEffect(() => {
    refetchTransactionConfirmation();
  }, [blockNumber, refetchTransactionConfirmation]);

  useEffect(() => {
    if (
      transactionConfirmation &&
      Number(transactionConfirmation) > 0 &&
      !transactionConfirmed
    ) {
      setSuccessMessage(true);
      setIsLoading(false);
      setTransactionConfirmed(true);
    }
  }, [transactionConfirmation, transactionConfirmed]);

  useEffect(() => {
    if (isError) {
      setErrorMessage(true);
    }
  }, [isError]);

  const { data: userTotalRewardsPendingData } = useSWR(
    address ? `/api/user/rewards?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  useEffect(() => {
    if (userTotalRewardsPendingData) {
      setAvailableToClaim(userTotalRewardsPendingData);
    } else {
      setAvailableToClaim(0);
    }
  }, [userTotalRewardsPendingData]);

  const fetchRewards = async () => {
    setIsLoading(true);

    if (!address) {
      setNoAddressMessage(true);
      setIsLoading(false);
      return;
    }

    if (!chain || !centralWalletAddress) {
      setErrorMessage(true);
      setIsLoading(false);
      return;
    }

    if (availableToClaim && availableToClaim > 0) {
      const gasAmount: string = claimingRewardsFee.toString();

      try {
        // make transaction to pay central wallet
        await sendTransactionAsync({
          to: centralWalletAddress,
          value: parseEther(Number(gasAmount).toFixed(18))
        });

        // make minting transaction
        const hash = await axios
          .post(`/api/user/claim-rewards`, {
            chain: chain,
            wallet: address,
            trotelPrice: trotelPrice
          })
          .then((response) => response.data.hash);

        setTransactionHash(hash);

        setAvailableToClaim(0);
      } catch (error) {
        console.error(error);
        setErrorMessage(true);
        setIsLoading(false);
      }
    } else {
      setNothingToClaimMessage(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      address &&
      !!availableToClaim &&
      availableToClaim > 0 &&
      !isLoading &&
      timeLeft &&
      timeLeft <= 0 &&
      !isWeeklyReserveEmpty
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address, availableToClaim, isLoading, timeLeft, isWeeklyReserveEmpty]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => fetchRewards()}
        isLoading={isLoading}
        disabled={disabled}
        isFull={true}
        text={
          isWeeklyReserveEmpty
            ? lang === "en"
              ? "Weekly Reserve Empty"
              : "Réserve Hebdomadaire Vide"
            : lang === "en"
              ? "Claim"
              : "Réclamer"
        }
      />

      <SuccessNotification
        display={successMessage}
        onClose={() => setSuccessMessage(false)}
        lang={lang}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You got your TrotelCoins"
            : "Vous avez obtenu vos TrotelCoins"
        }
      />
      <FailNotification
        display={nothingToClaimMessage}
        onClose={() => setNothingToClaimMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You have nothing to claim"
            : "Vous n'avez rien à récupérer"
        }
      />
      <FailNotification
        display={errorMessage}
        lang={lang}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "There was an error claiming your rewards"
            : "Il y a eu une erreur en récupérant vos récompenses"
        }
      />
      <FailNotification
        display={noAddressMessage}
        onClose={() => setNoAddressMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You didn't connect your wallet"
            : "Vous n'avez pas connecté votre portefeuille"
        }
      />
      <FailNotification
        display={chainError && Boolean(address)}
        onClose={() => {
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

export default RewardsButton;
