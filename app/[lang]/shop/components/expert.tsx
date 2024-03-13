"use client";

import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { polygon } from "wagmi/chains";
import "animate.css";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";
import {
  trotelCoinAddress,
  trotelCoinExpertAddress,
} from "@/data/web3/addresses";
import { Lang } from "@/types/types";
import Tilt from "react-parallax-tilt";
import BlueButton from "@/app/[lang]/components/blueButton";
import axios from "axios";

const holdingRequirements: number = 50000;

const Expert = ({ lang }: { lang: Lang }) => {
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
    1: lang === "en" ? "Beta features" : "Fonctionnalités bêta",
    2: lang === "en" ? "Crypto community" : "Communauté crypto",
  };

  const { address } = useAccount();
  const { data } = useBalance({
    address: address as Address,
    chainId: polygon.id,
    token: trotelCoinAddress,
  });
  const { isSuccess, isError, writeContractAsync } = useWriteContract({
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "claim",
    chainId: polygon.id,
  });
  const { data: claimed } = useReadContract({
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "balanceOf",
    chainId: polygon.id,
    args: [address],
    account: address as Address,
  });

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
    if (address) {
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

      const postClaimExpert = async () => {
        await axios
          .post(`/api/database/claimExpert?wallet=${address}`)
          .catch((error) => {
            console.error(error);
            setErrorMessage(true);
          });
      };

      postClaimExpert();
    }
  }, [isSuccess, address, setIsClaimedMessage, setIsClaimed]);

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
                🦊 {lang === "en" ? "Expert" : "Expert"}
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
              {!isClaimed && !isEligible && (
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
              {isEligible && !isClaimed && (
                <>
                  <BlueButton
                    lang={lang}
                    onClick={async () => {
                      try {
                        await writeContractAsync({
                          args: [address as Address],
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
              {isClaimed && (
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
      <Fail
        show={isNotConnectedMessage}
        title={lang === "en" ? "Not connected" : "Non connecté"}
        message={
          lang === "en" ? "You are not connected." : "Vous n'êtes pas connecté."
        }
        onClose={() => setIsNotConnectedMessage(false)}
        lang={lang}
      />
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={lang === "en" ? "An error occured" : "Une erreur est survenue"}
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
        title={lang === "en" ? "Expert" : "Expert"}
        message={
          lang === "en"
            ? "You became an Expert."
            : "Vous êtes devenu un Expert."
        }
        onClose={() => setIsClaimedMessage(false)}
        lang={lang}
      />
    </>
  );
};

export default Expert;
