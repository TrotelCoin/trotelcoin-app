"use client";

import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import React, { useContext, useEffect, useState } from "react";
import { Address, formatEther } from "viem";
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
import {
  trotelCoinAddress,
  trotelCoinIntermediateAddress,
} from "@/data/web3/addresses";
import type { Lang } from "@/types/lang";
import Tilt from "react-parallax-tilt";
import axios from "axios";
import BlueButton from "@/app/[lang]/components/blueButton";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import UserContext from "@/app/[lang]/contexts/userContext";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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

  const { address } = useAccount();
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
  const { data: holdingRequirement, refetch: refetchHolding } = useReadContract(
    {
      address: trotelCoinIntermediateAddress,
      abi: trotelCoinIntermediateABI,
      functionName: "holdingRequirement",
      chainId: polygon.id,
      account: address as Address,
    }
  );
  const { isPending, writeContractAsync } = useWriteContract({
    mutation: {
      onError: () => {
        setErrorMessage(true);
      },
      onSuccess: () => {
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
      },
    },
  });
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
      refetchHolding();
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
  }, [address, claimed]);

  const checkEligibility = async () => {
    if (address && data) {
      if (holdingRequirement) {
        const balance = parseFloat(data?.formatted);
        const holdingRequirementFormatted = Number(
          formatEther(holdingRequirement as bigint)
        );
        if (balance >= holdingRequirementFormatted) {
          setIsEligible(true);
          setIsEligibleMessageSuccess(true);
        } else {
          setIsEligibleMessage(true);
        }
      } else {
        setErrorMessage(true);
      }
    } else {
      setIsNotConnectedMessage(true);
    }
  };

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
          className={`overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 ${
            isClaimed
              ? "rainbow-border"
              : "border border-gray-900/10 dark:border-gray-100/10"
          } backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div
                className={`font-semibold text-gray-900 dark:text-gray-100 text-2xl ${
                  isClaimed && "rainbow-text"
                }`}
              >
                {lang === "en" ? "Intermediate" : "Intermédiaire"}
              </div>
              <Link
                href="https://docs.trotelcoin.com/overview/ranks"
                target="_blank"
              >
                <InformationCircleIcon className="h-6 w-6 text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-200" />
              </Link>
            </div>
            <div className="flex items-center justify-center mt-5">
              <span className="text-8xl">🙈</span>
            </div>
            <div className="flex flex-col mt-5">
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
                      lang === "en" ? "Buy the NFT" : "Achetez le NFT"
                    }
                  />
                </>
              )}
              {(isClaimed || isIntermediate) && (
                <button className="disabled cursor-not-allowed bg-gray-800 dark:bg-gray-100 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-xl font-semibold">
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
          message={`Vous avez besoin de ${
            holdingRequirement
              ? Number(
                  formatEther(holdingRequirement as bigint)
                ).toLocaleString("en-US")
              : null
          } TrotelCoins pour réclamer ce NFT.`}
          onClose={() => setIsEligibleMessage(false)}
          lang={lang}
        />
      ) : (
        <Fail
          show={isEligibleMessage}
          title="You're not eligible"
          message={`You need ${
            holdingRequirement
              ? Number(
                  formatEther(holdingRequirement as bigint)
                ).toLocaleString("en-US")
              : null
          } TrotelCoin to buy the NFT.`}
          onClose={() => setIsEligibleMessage(false)}
          lang={lang}
        />
      )}
      <Fail
        show={isNotConnectedMessage}
        onClose={() => setIsNotConnectedMessage(false)}
        title={lang === "en" ? "Not connected" : "Non connecté"}
        message={
          lang === "en" ? "You are not connected." : "Vous n'êtes pas connecté."
        }
        lang={lang}
      />
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
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
