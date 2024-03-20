"use client";

import type { Lang } from "@/types/lang";
import { useAccount, useSwitchChain, useSendTransaction } from "wagmi";
import React, { useEffect, useState } from "react";
import Fail from "@/app/[lang]/components/modals/fail";
import { Address, parseEther } from "viem";
import Success from "@/app/[lang]/components/modals/success";
import "animate.css";
import { polygon } from "viem/chains";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import axios from "axios";
import BlueButton from "@/app/[lang]/components/blueButton";

const RewardsButton = ({
  lang,
  centralWalletAddress,
  chainError,
  setChainError,
  setClaimed,
}: {
  lang: Lang;
  centralWalletAddress: Address;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
  setClaimed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableToClaim, setAvailableToClaim] = useState<number>(0);
  const [nothingToClaimMessage, setNothingToClaimMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [noAddressMessage, setNoAddressMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [errorHappened, setErrorHappened] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const { address } = useAccount();
  const { sendTransactionAsync, isError } = useSendTransaction({
    mutation: {
      onError: () => {
        setErrorMessage(true);
        setIsLoading(false);
        setErrorHappened(true);
      },
    },
  });
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isError) {
      setErrorMessage(true);
    }
  }, [isError]);

  const { data: userTotalRewardsPendingData } = useSWR(
    address
      ? `/api/database/getUserTotalRewardsPending?wallet=${address}`
      : null,
    fetcher
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

      // make transaction to pay central wallet
      await sendTransactionAsync({
        to: centralWalletAddress,
        value: parseEther(gasAmount),
      });

      if (errorHappened) {
        setIsLoading(false);
        setErrorMessage(true);
        return;
      }

      setAvailableToClaim(0);

      // make minting transaction
      await axios
        .post(
          `/api/claimRewards?address=${address}&amount=${availableToClaim}&centralWalletAddress=${centralWalletAddress}`
        )
        .catch((error) => {
          console.error(error);
          setErrorMessage(true);
          setIsLoading(false);
        });

      // reset database pending rewards
      await axios
        .post(`/api/database/postResetRewardsPending?wallet=${address}`)
        .then((response) => {
          if (!response.data.success) {
            setErrorMessage(true);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(true);
          setIsLoading(false);
        });

      setSuccessMessage(true);
      setIsLoading(false);
      setClaimed(true);
    } else {
      setNothingToClaimMessage(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address && availableToClaim > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address, availableToClaim]);

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

      <Success
        show={successMessage}
        onClose={() => setSuccessMessage(false)}
        lang={lang}
        title={lang === "en" ? "Success" : "Succès"}
        message={
          lang === "en"
            ? "You got your TrotelCoins"
            : "Vous avez obtenu vos TrotelCoins"
        }
      />
      <Fail
        show={nothingToClaimMessage}
        onClose={() => setNothingToClaimMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You have nothing to claim"
            : "Vous n'avez rien à récupérer"
        }
      />
      <Fail
        show={errorMessage}
        lang={lang}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "There was an error claiming your rewards"
            : "Il y a eu une erreur en récupérant vos récompenses"
        }
      />
      <Fail
        show={noAddressMessage}
        onClose={() => setNoAddressMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "You didn't connect your wallet"
            : "Vous n'avez pas connecté votre portefeuille"
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

export default RewardsButton;
