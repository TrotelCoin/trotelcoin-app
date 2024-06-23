"use client";

import trotelCoinExpertABI from "@/abi/polygon/premium/trotelCoinExpert";
import React, { useContext, useEffect, useState } from "react";
import { Address, formatEther, Hash } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useBlockNumber,
  useTransactionConfirmations
} from "wagmi";
import "animate.css";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";
import { contracts } from "@/data/web3/addresses";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import type { Lang } from "@/types/language/lang";
import Tilt from "react-parallax-tilt";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import PremiumContext from "@/contexts/premium";
import Link from "next/link";
import trotelCoinABI from "@/abi/polygon/trotelcoin/trotelCoin";
import ChainContext from "@/contexts/chain";

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
  const [needApproval, setNeedApproval] = useState<boolean>(true);
  const [approved, setApproved] = useState<boolean>(false);
  const [approvedMessage, setApprovedMessage] = useState<boolean>(false);
  const [approveConfirmed, setApproveConfirmed] = useState<boolean>(false);
  const [claimConfirmed, setClaimedConfirmed] = useState<boolean>(false);

  const { address } = useAccount();
  const { isExpert } = useContext(PremiumContext);
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: contracts[chain.id].trotelCoinAddress,
    abi: trotelCoinABI,
    functionName: "allowance",
    chainId: chain.id,
    args: [address, contracts[chain.id].trotelCoinExpertAddress],
    account: address as Address
  });

  const {
    isPending: isLoadingApproval,
    writeContractAsync: approvingAsync,
    data: approveHash
  } = useWriteContract({
    mutation: {
      onError: () => {
        setErrorMessage(true);
      },
      onSuccess: () => {
        setApproveConfirmed(false);
      }
    }
  });

  const { data: approveConfirmation, refetch: refetchApproveConfirmation } =
    useTransactionConfirmations({
      hash: approveHash as Hash,
      chainId: chain.id
    });

  useEffect(() => {
    if (
      approveConfirmation &&
      Number(approveConfirmation) > 0 &&
      !approveConfirmed
    ) {
      setApproved(true);
      setApprovedMessage(true);
      setApproveConfirmed(true);
    }
  }, [approveConfirmation, approveConfirmed]);

  const { data, refetch: refetchBalance } = useBalance({
    address: address as Address,
    chainId: chain.id,
    token: contracts[chain.id].trotelCoinAddress
  });

  const { data: holdingRequirement, refetch: refetchHolding } = useReadContract(
    {
      address: contracts[chain.id].trotelCoinExpertAddress,
      abi: trotelCoinExpertABI,
      functionName: "holdingRequirement",
      chainId: chain.id,
      account: address as Address
    }
  );
  const {
    isPending,
    writeContractAsync,
    data: claimHash
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setClaimedConfirmed(false);
      },
      onError: () => {
        setErrorMessage(true);
      }
    }
  });

  const { data: claimConfirmation, refetch: refetchClaimConfirmation } =
    useTransactionConfirmations({
      chainId: chain.id,
      hash: claimHash as Hash
    });

  useEffect(() => {
    if (claimConfirmation && Number(claimConfirmation) > 0 && !claimConfirmed) {
      setIsClaimed(true);
      setIsClaimedMessage(true);
      setClaimedConfirmed(true);
    }
  }, [claimConfirmation, claimConfirmed]);

  const { data: claimed, refetch: refetchBalanceExpert } = useReadContract({
    address: contracts[chain.id].trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "balanceOf",
    chainId: chain.id,
    args: [address],
    account: address as Address
  });

  useEffect(() => {
    if (address) {
      refetchBalance();
      refetchBalanceExpert();
      refetchHolding();
      refetchAllowance();
      refetchApproveConfirmation();
      refetchClaimConfirmation();
    } else {
      setIsClaimed(false);
    }
  }, [
    blockNumber,
    address,
    refetchBalance,
    refetchBalanceExpert,
    refetchHolding,
    refetchAllowance,
    refetchApproveConfirmation,
    refetchClaimConfirmation
  ]);

  useEffect(() => {
    if (parseFloat(claimed as string) > 0) {
      setIsClaimed(true);
    } else if (!address) {
      setIsClaimed(false);
    } else {
      setIsClaimed(false);
    }
  }, [address, claimed]);

  useEffect(() => {
    if (allowance && holdingRequirement) {
      const allowanceFormatted = Number(formatEther(allowance as bigint));
      const holdingRequirementFormatted = Number(
        formatEther(holdingRequirement as bigint)
      );

      if (allowanceFormatted >= holdingRequirementFormatted) {
        setNeedApproval(false);
      } else {
        setNeedApproval(true);
      }
    } else {
      setNeedApproval(true);
    }
  }, [allowance, holdingRequirement]);

  const checkEligibility = async () => {
    if (address && data) {
      if (holdingRequirement) {
        const balance = parseFloat(data.formatted);
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
          className={`overflow-hidden rounded-xl border border-gray-900/10 bg-white backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div
                className={`text-2xl font-semibold text-gray-900 dark:text-gray-100 ${
                  isClaimed && "rainbow-text"
                }`}
              >
                {lang === "en" ? "Expert" : "Expert"}
              </div>
              <Link
                href="https://docs.trotelcoin.com/overview/ranks"
                target="_blank"
              >
                <InformationCircleIcon className="h-6 w-6 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300" />
              </Link>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <span className="text-8xl">🦊</span>
            </div>
            <div className="mt-5 flex flex-col">
              {!isClaimed && !isEligible && !isExpert && (
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
              {isEligible && !isClaimed && !isExpert && needApproval && (
                <>
                  <BlueButton
                    lang={lang}
                    isLoading={isLoadingApproval || approved}
                    onClick={async () => {
                      await approvingAsync({
                        address: contracts[chain.id].trotelCoinAddress,
                        abi: trotelCoinABI,
                        functionName: "approve",
                        chainId: chain.id,
                        args: [contracts[chain.id].trotelCoinExpertAddress, holdingRequirement]
                      });
                    }}
                    text={lang === "en" ? "Approve" : "Approuver"}
                  />
                </>
              )}
              {isEligible && !isClaimed && !isExpert && !needApproval && (
                <>
                  <BlueButton
                    lang={lang}
                    isLoading={isPending}
                    onClick={async () => {
                      await writeContractAsync({
                        address: contracts[chain.id].trotelCoinExpertAddress,
                        abi: trotelCoinExpertABI,
                        functionName: "mint",
                        chainId: chain.id,
                        args: [address]
                      });
                    }}
                    text={lang === "en" ? "Buy the NFT" : "Achetez le NFT"}
                  />
                </>
              )}
              {(isClaimed || isExpert) && (
                <button className="disabled cursor-not-allowed rounded-xl bg-gray-800 px-6 py-2 text-sm font-semibold text-gray-100 hover:border-gray-900/50 focus:border-blue-500 dark:bg-gray-100 dark:text-gray-900 dark:hover:border-gray-100/50">
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
        onClose={() => setIsClaimedMessage(false)}
        title={lang === "en" ? "Expert" : "Expert"}
        message={
          lang === "en"
            ? "You became an Expert."
            : "Vous êtes devenu un Expert."
        }
        lang={lang}
      />
      <Success
        show={approvedMessage}
        onClose={() => setApprovedMessage(false)}
        title={lang === "en" ? "Approved" : "Approuvé"}
        message={
          lang === "en"
            ? "You can buy the NFT now."
            : "Vous pouvez maintenant acheter le NFT."
        }
        lang={lang}
      />
    </>
  );
};

export default Expert;
