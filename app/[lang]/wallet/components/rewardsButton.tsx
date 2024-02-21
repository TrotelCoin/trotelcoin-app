import { trotelCoinLearningAddress } from "@/data/web3/addresses";
import { Lang } from "@/types/types";
import { useAddress, Web3Button } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Fail from "@/app/[lang]/components/fail";
import { useSendTransaction } from "wagmi";
import { centralWalletAccount } from "@/lib/viem/client";
import { Address, parseEther } from "viem";

const RewardsButton = ({ lang }: { lang: Lang }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableToClaim, setAvailableToClaim] = useState<number>(0);
  const [nothingToClaimMessage, setNothingToClaimMessage] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

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
      if (address && availableToClaim && availableToClaim > 0) {
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
          return;
        }

        // make transaction to pay central wallet
        sendTransactionAsync({
          to: centralWalletAccount.address as Address,
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
      } else {
        setNothingToClaimMessage(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <Web3Button
        action={() => fetchRewards()}
        contractAddress={trotelCoinLearningAddress}
        className="!w-full !bg-blue-500 hover:!bg-blue-400 dark:!bg-blue-300 dark:hover:!bg-blue-400 focus:!border-blue-500 dark:focus:!border-blue-300 !text-sm !px-6 !py-2 !text-gray-100 dark:!text-gray-900 !rounded-lg !font-semibold"
      >
        {isLoading ? (
          <span className="animate__animated animate__slower animate__flash animate__infinite">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </span>
        ) : (
          <>{lang === "en" ? "Claim" : "Réclamer"}</>
        )}
      </Web3Button>
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
    </>
  );
};

export default RewardsButton;
