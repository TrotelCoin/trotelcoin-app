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
import { polygonAmoy } from "viem/chains";

const RewardsButton = ({
  lang,
  centralWalletAddress,
  chainError,
  setChainError,
  setClaimed
}: {
  lang: Lang;
  centralWalletAddress: Address;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
  setClaimed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableToClaim, setAvailableToClaim] = useState<number | null>(null);
  const [nothingToClaimMessage, setNothingToClaimMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [noAddressMessage, setNoAddressMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [errorHappened, setErrorHappened] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [transactionHash, setTransactionHash] = useState<Hash | null>(null);
  const [transactionConfirmed, setTransactionConfirmed] =
    useState<boolean>(false);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);

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
        setErrorHappened(true);
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
      setClaimed(true);
      setTransactionConfirmed(true);
    }
  }, [transactionConfirmation, setClaimed, transactionConfirmed]);

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

    if (availableToClaim && availableToClaim > 0) {
      const gasAmount: string = "0.02";

      try {
        // make transaction to pay central wallet
        await sendTransactionAsync({
          to: centralWalletAddress,
          value: parseEther(Number(gasAmount).toFixed(18))
        });

        setAvailableToClaim(0);

        // make minting transaction
        const hash = await axios
          .post(
            `/api/user/claim-rewards?address=${address}&amount=${availableToClaim}&centralWalletAddress=${centralWalletAddress}&chainId=${chain.id}`
          )
          .then((response) => response.data.hash);

        setTransactionHash(hash);

        if (chain.id !== polygonAmoy.id) {
          // reset database pending rewards
          await axios
            .post(`/api/user/rewards/reset?wallet=${address}`)
            .then((response) => {
              if (!response.data.success) {
                setErrorMessage(true);
                setIsLoading(false);
              }
            });
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setNothingToClaimMessage(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address && availableToClaim && availableToClaim > 0 && !isLoading) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address, availableToClaim, isLoading]);

  return (
    <>
      <BlueButton
        lang={lang}
        onClick={() => fetchRewards()}
        isLoading={isLoading}
        disabled={disabled}
        isFull={true}
        text={lang === "en" ? "Claim" : "Réclamer"}
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
