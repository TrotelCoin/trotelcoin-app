"use client";

import { Lang } from "@/types/types";
import {
  useAddress,
  useSwitchChain,
  useTransferNativeToken,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Fail from "@/app/[lang]/components/modals/fail";
import { Address } from "viem";
import Success from "@/app/[lang]/components/modals/success";
import "animate.css";
import { polygon } from "viem/chains";

const RewardsButton = ({
  lang,
  centralWalletAddress,
  chainError,
  setChainError,
}: {
  lang: Lang;
  centralWalletAddress: Address;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableToClaim, setAvailableToClaim] = useState<number>(0);
  const [nothingToClaimMessage, setNothingToClaimMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [noAddressMessage, setNoAddressMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const address = useAddress();
  const { mutateAsync, isError } = useTransferNativeToken();
  const switchChain = useSwitchChain();

  useEffect(() => {
    if (isError) {
      setErrorMessage(true);
    }
  }, [isError]);

  useEffect(() => {
    const fetchAvailableToClaim = async () => {
      try {
        const result = await fetch(
          `/api/database/getUserTotalRewardsPending?wallet=${address}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
            cache: "no-store",
          }
        );
        const data = await result.json();
        setAvailableToClaim(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (address) {
      fetchAvailableToClaim();
    } else {
      setAvailableToClaim(0);
    }
  }, [availableToClaim, address]);

  const fetchRewards = async () => {
    setIsLoading(true);
    try {
      if (!address) {
        setNoAddressMessage(true);
        setIsLoading(false);
        return;
      }

      if (availableToClaim && availableToClaim > 0) {
        const gasAmount: string = "0.02";

        // make transaction to pay central wallet
        try {
          await mutateAsync({
            to: centralWalletAddress,
            amount: gasAmount,
          });
        } catch (error) {
          console.error(error);
          setErrorMessage(true);
          setIsLoading(false);
          return;
        }

        setAvailableToClaim(0);

        // make minting transaction
        try {
          await fetch(
            `/api/claimRewards?address=${address}&amount=${availableToClaim}&centralWalletAddress=${centralWalletAddress}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              cache: "no-store",
            }
          );
        } catch (error) {
          console.error(error);
          setErrorMessage(true);
          setIsLoading(false);
          return;
        }

        // reset database pending rewards
        try {
          const reset = await fetch(
            `/api/database/postResetRewardsPending?wallet=${address}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
              },
              cache: "no-store",
            }
          );
          const data = await reset.json();

          if (!data.success) {
            setErrorMessage(true);
            return;
          }
        } catch (error) {
          console.error(error);
          setErrorMessage(true);
          setIsLoading(false);
          return;
        }

        setSuccessMessage(true);
        setIsLoading(false);
      } else {
        setNothingToClaimMessage(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <button
        onClick={() => fetchRewards()}
        className="w-full bg-blue-500 hover:bg-blue-400 focus:border-blue-500 text-sm px-6 py-2 text-gray-100 rounded-xl font-semibold"
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
        onClose={() => setErrorMessage(false)}
        lang={lang}
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

export default RewardsButton;
