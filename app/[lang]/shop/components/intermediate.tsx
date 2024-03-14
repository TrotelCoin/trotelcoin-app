"use client";

import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import React, { useContext, useEffect, useState } from "react";
import { Address } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useBlockNumber,
} from "wagmi";
import { polygon } from "wagmi/chains";
import "animate.css";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";
import FailNotification from "@/app/[lang]/components/modals/failNotification";
import {
  trotelCoinAddress,
  trotelCoinIntermediateAddress,
} from "@/data/web3/addresses";
import { Lang } from "@/types/types";
import Tilt from "react-parallax-tilt";
import axios from "axios";
import BlueButton from "@/app/[lang]/components/blueButton";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import UserContext from "@/app/[lang]/contexts/userContext";

const holdingRequirements: number = 10000;

const Intermediate = ({ lang }: { lang: Lang }) => {
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [isEligibleMessage, setIsEligibleMessage] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [isNotConnectedMessage, setIsNotConnectedMessage] =
    useState<boolean>(false);
  const [isClaimedMessage, setIsClaimedMessage] = useState<boolean>(false);
  const [isEligibleMessageSuccess, setIsEligibleMessageSuccess] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const advantages = {
    1: lang === "en" ? "Advanced courses" : "Cours avancés",
    2: lang === "en" ? "Unlimited lives" : "Vies illimitées",
  };

  const { address, isConnected } = useAccount();
  const { isLoggedIn } = useContext(UserContext);
  const { isIntermediate } = useContext(PremiumContext);
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });
  const { data, refetch: refetchBalance } = useBalance({
    address: address as Address,
    chainId: polygon.id,
    token: trotelCoinAddress,
  });
  const { isSuccess, isError, isPending, writeContractAsync } =
    useWriteContract();
  const { data: claimed, refetch: refetchBalanceIntermediate } =
    useReadContract({
      address: trotelCoinIntermediateAddress,
      abi: trotelCoinIntermediateABI,
      functionName: "balanceOf",
      chainId: polygon.id,
      args: [address],
      account: address as Address,
    });

  useEffect(() => {
    if (address) {
      refetchBalance();
      refetchBalanceIntermediate();
    } else {
      setIsClaimed(false);
    }
  }, [blockNumber, address]);

  useEffect(() => {
    if (parseFloat(claimed as string) > 0) {
      setIsClaimed(true);
    } else if (!address) {
      setIsClaimed(false);
    } else {
      setIsClaimed(false);
    }
  }, [address]);

  const checkEligibility = async () => {
    if (isLoggedIn) {
      const balance = parseFloat(data?.formatted as string);
      if (balance >= holdingRequirements) {
        setIsEligible(true);
        setIsEligibleMessageSuccess(true);
      } else {
        setIsEligibleMessage(true);
      }
    } else {
      setIsNotConnectedMessage(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsClaimed(true);
      setIsClaimedMessage(true);

      const postClaimIntermediate = async () => {
        await axios
          .post(`/api/database/claimIntermediate?wallet=${address}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
          });
      };

      postClaimIntermediate();
    }
  }, [isSuccess, address, setIsClaimed, setIsClaimedMessage]);

  useEffect(() => {
    if (isError) {
      setErrorMessage(true);
    }
  }, [isError]);

  return (
    <>
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.15}
        perspective={800}
      >
        <div
          className={`overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ${
            isClaimed
              ? "rainbow-border"
              : "border border-gray-900/10 dark:border-gray-100/10"
          } backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-1">
              <div
                className={`font-semibold text-gray-900 dark:text-gray-100 text-2xl ${
                  isClaimed && "rainbow-text"
                }`}
              >
                🙈 {lang === "en" ? "Intermediate" : "Intermédiaire"}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col mt-4">
                <div className="flex flex-col gap-2 my-4">
                  {Object.values(advantages).map((advantage, index) => (
                    <div key={index} className="flex gap-1">
                      <div className="text-gray-700 flex items-center dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-1 text-gray-900 dark:text-gray-100"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        <>{advantage}</>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {!isClaimed && !isEligible && !isIntermediate && (
                <>
                  <BlueButton
                    lang={lang}
                    onClick={checkEligibility}
                    text={
                      lang === "en"
                        ? "Check eligibility"
                        : "Vérifier l'éligibilité"
                    }
                  />
                </>
              )}
              {isEligible && !isClaimed && !isIntermediate && (
                <>
                  <BlueButton
                    lang={lang}
                    isLoading={isPending}
                    onClick={async () => {
                      try {
                        await writeContractAsync({
                          address: trotelCoinIntermediateAddress,
                          abi: trotelCoinIntermediateABI,
                          functionName: "claim",
                          chainId: polygon.id,
                        });
                      } catch (error) {
                        console.error(error);
                        setErrorMessage(true);
                        return;
                      }
                    }}
                    text={
                      lang === "en" ? "Claim your NFT" : "Réclamez votre NFT"
                    }
                  />
                </>
              )}
              {(isClaimed || isIntermediate) && (
                <button className="disabled cursor-not-allowed bg-gray-800 dark:bg-gray-200 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-xl font-semibold">
                  {lang === "en" ? "Already claimed" : "Déjà réclamé"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Tilt>
      {lang === "fr" ? (
        <Fail
          show={isEligibleMessage}
          title="Vous n'êtes pas éligible"
          message={`Vous avez besoin de ${holdingRequirements.toLocaleString(
            "en-US"
          )} TrotelCoins pour réclamer ce NFT.`}
          onClose={() => setIsEligibleMessage(false)}
          lang={lang}
        />
      ) : (
        <Fail
          show={isEligibleMessage}
          title="You're not eligible"
          message={`You need ${holdingRequirements.toLocaleString(
            "en-US"
          )} TrotelCoin to claim the NFT.`}
          onClose={() => setIsEligibleMessage(false)}
          lang={lang}
        />
      )}
      <FailNotification
        display={isNotConnectedMessage}
        title={lang === "en" ? "Not connected" : "Non connecté"}
        message={
          lang === "en" ? "You are not connected." : "Vous n'êtes pas connecté."
        }
        lang={lang}
      />
      <FailNotification
        display={errorMessage}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={lang === "en" ? "An error occured" : "Une erreur a survenue"}
      />
      <Success
        show={isEligibleMessageSuccess}
        title={lang === "en" ? "Eligible" : "Éligible"}
        message={
          lang === "en"
            ? "Congratulations. You are eligible."
            : "Félicitations. Vous êtes éligible."
        }
        onClose={() => setIsEligibleMessageSuccess(false)}
        lang={lang}
      />
      <Success
        show={isClaimedMessage}
        onClose={() => setIsClaimedMessage(false)}
        title={lang === "en" ? "Intermediate" : "Intermédiaire"}
        message={
          lang === "en"
            ? "You became an Intermediate."
            : "Vous êtes devenu un Intermédiaire."
        }
        lang={lang}
      />
    </>
  );
};

export default Intermediate;
