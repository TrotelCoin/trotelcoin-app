"use client";

import { Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Fail from "@/app/[lang]/components/fail";
import { useSendTransaction } from "wagmi";
import { centralWalletAccountAddress } from "@/lib/viem/client";
import { parseEther } from "viem";
import Success from "@/app/[lang]/components/success";
import "animate.css";

const RewardsButton = ({ lang }: { lang: Lang }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableToClaim, setAvailableToClaim] = useState<number>(0);
  const [nothingToClaimMessage, setNothingToClaimMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [noAddressMessage, setNoAddressMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const address = useAddress();

  const { sendTransactionAsync } = useSendTransaction();

  useEffect(() => {
    const fetchAvailableToClaim = async () => {
      const result = await fetch(
        `/api/database/totalRewardsPending?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setAvailableToClaim(data);
    };

    if (address) {
      fetchAvailableToClaim();

      const interval = setInterval(fetchAvailableToClaim, 10000);

      return () => clearInterval(interval);
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
        const response = await fetch(
          `/api/getGasFeeForRewards?address=${address}&amount=${availableToClaim}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const gas = await response.json();

        if (gas <= 0) {
          setErrorMessage(true);
          setIsLoading(false);
          return;
        }

        // make transaction to pay central wallet
        sendTransactionAsync({
          to: centralWalletAccountAddress,
          value: parseEther(gas.toString()),
        });

        // make minting transaction
        await fetch(
          `/api/claimRewards?address=${address}&amount=${availableToClaim}&gas=${gas}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        setAvailableToClaim(0);

        // reset database pending rewards
        const reset = await fetch(
          `/api/database/resetRewardsPending?wallet=${address}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const data = await reset.json();

        if (!data.success) {
          setErrorMessage(true);
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
        className="w-full bg-blue-500 hover:bg-blue-400 dark:bg-blue-300 dark:hover:bg-blue-400 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold"
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
            : "Tu as obtenu tes TrotelCoins"
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
            : "Tu n'as rien à récupérer"
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
            : "Il y a eu une erreur en récupérant tes récompenses"
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
            : "Tu n'as pas connecté ton portefeuille"
        }
      />
    </>
  );
};

export default RewardsButton;
