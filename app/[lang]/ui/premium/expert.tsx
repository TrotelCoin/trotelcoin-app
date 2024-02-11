"use client";

import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import React, { useEffect, useState } from "react";
import {
  useBalance,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  Address,
} from "wagmi";
import { polygon } from "wagmi/chains";
import "animate.css";
import Fail from "@/app/[lang]/ui/modals/fail";
import Success from "@/app/[lang]/ui/modals/success";
import { trotelCoinAddress, trotelCoinExpertAddress } from "@/data/addresses";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useAddress } from "@thirdweb-dev/react";
import Tilt from "react-parallax-tilt";

const holdingRequirements: number = 50000;

const Expert = ({ lang }: { lang: Lang }) => {
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [isEligibleMessage, setIsEligibleMessage] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [isNotConnected, setIsNotConnected] = useState<boolean>(false);
  const [isNotConnectedMessage, setIsNotConnectedMessage] =
    useState<boolean>(false);
  const [isClaimedMessage, setIsClaimedMessage] = useState<boolean>(false);
  const [isEligibleMessageSuccess, setIsEligibleMessageSuccess] =
    useState<boolean>(false);
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const advantages = {
    1: typeof dict?.expert !== "string" && dict?.expert.advantage1,
    2: typeof dict?.expert !== "string" && dict?.expert.advantage2,
  };

  const address = useAddress();
  const { data } = useBalance({
    address: address as Address,
    chainId: polygon.id,
    token: trotelCoinAddress,
    watch: true,
  });
  const { config } = usePrepareContractWrite({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "mint",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
  });
  const { write, isSuccess } = useContractWrite(config);
  const { data: claimed } = useContractRead({
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "balanceOf",
    chainId: polygon.id,
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
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
      setIsNotConnected(true);
      setIsNotConnectedMessage(true);
    }
  };

  const claim = async () => {
    try {
      if (write) {
        write();
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsClaimed(true);
      setIsClaimedMessage(true);

      const postClaimExpert = async () => {
        fetch(`/api/database/claimExpert?wallet=${address}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      };

      postClaimExpert();
    }
  }, [isSuccess, address, setIsClaimedMessage, setIsClaimed]);

  return (
    <>
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.2}
        perspective={800}
        scale={1.05}
      >
        <div
          className={`overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 ${
            isClaimed
              ? "rainbow-border"
              : "border border-black/10 dark:border-white/10"
          } backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-1">
              <div
                className={`font-semibold text-gray-900 dark:text-gray-100 text-2xl ${
                  isClaimed && "rainbow-text"
                }`}
              >
                🦊 Expert
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
                <button
                  onClick={checkEligibility}
                  className="bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-yellow-500 dark:focus:border-yellow-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-900 rounded-lg font-semibold"
                >
                  {typeof dict?.premium !== "string" && (
                    <>{dict?.premium.eligibility}</>
                  )}
                </button>
              )}
              {isEligible && !isClaimed && (
                <button
                  onClick={claim}
                  className="bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-300 dark:hover:bg-yellow-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-yellow-500 dark:focus:border-yellow-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-900 rounded-lg font-semibold"
                >
                  {typeof dict?.premium !== "string" && (
                    <>{dict?.premium.claim}</>
                  )}
                </button>
              )}
              {isClaimed && (
                <button className="disabled cursor-not-allowed bg-gray-900 dark:bg-gray-100 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-yellow-500 dark:focus:border-yellow-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold">
                  {typeof dict?.premium !== "string" && (
                    <>{dict?.premium.claimed}</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </Tilt>
      {lang === "fr" ? (
        <Fail
          show={isEligibleMessage}
          title="Tu n'es pas éligible"
          message={`Tu as besoin de ${holdingRequirements} TrotelCoins pour réclamer ce NFT.`}
          onClose={() => setIsEligibleMessage(false)}
          lang={lang}
        />
      ) : (
        <Fail
          show={isEligibleMessage}
          title="You're not eligible"
          message={`You need ${holdingRequirements} TrotelCoin to claim the NFT.`}
          onClose={() => setIsEligibleMessage(false)}
          lang={lang}
        />
      )}
      <Fail
        show={isNotConnectedMessage}
        title={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.connectWallet !== "string" &&
          dict?.modals.connectWallet.title === "string"
            ? dict?.modals.connectWallet.title
            : ""
        }
        message={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.connectWallet !== "string" &&
          typeof dict?.modals.connectWallet.message === "string"
            ? dict?.modals.connectWallet.message
            : ""
        }
        onClose={() => setIsNotConnectedMessage(false)}
        lang={lang}
      />
      <Success
        show={isEligibleMessageSuccess}
        title={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.eligible !== "string" &&
          dict?.modals.eligible.title === "string"
            ? dict?.modals.eligible.title
            : ""
        }
        message={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.eligible !== "string" &&
          typeof dict?.modals.eligible.message === "string"
            ? dict?.modals.eligible.message
            : ""
        }
        onClose={() => setIsEligibleMessageSuccess(false)}
        lang={lang}
      />
      <Success
        show={isClaimedMessage}
        title={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.claimedExpertNFT !== "string" &&
          dict?.modals.claimedExpertNFT.title === "string"
            ? dict?.modals.claimedExpertNFT.title
            : ""
        }
        message={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.claimedExpertNFT !== "string" &&
          typeof dict?.modals.claimedExpertNFT.message === "string"
            ? dict?.modals.claimedExpertNFT.message
            : ""
        }
        onClose={() => setIsClaimedMessage(false)}
        lang={lang}
      />
    </>
  );
};

export default Expert;
