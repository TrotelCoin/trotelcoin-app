"use client";

import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { polygon } from "wagmi/chains";
import "animate.css";
import Fail from "@/app/[lang]/ui/modals/fail";
import Success from "../modals/success";
import {
  trotelCoinAddress,
  trotelCoinIntermediateAddress,
} from "@/data/addresses";
import { useSession } from "next-auth/react";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

const holdingRequirements: number = 10000;

const Intermediate = ({ lang }: { lang: Lang }) => {
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
    1: typeof dict?.intermediate !== "string" && dict?.intermediate.advantage1,
    2: typeof dict?.intermediate !== "string" && dict?.intermediate.advantage2,
  };

  const { address, isConnected } = useAccount();
  const { data: session } = useSession();
  const { data } = useBalance({
    address: address,
    chainId: polygon.id,
    token: trotelCoinAddress,
    enabled: Boolean(address),
    watch: true,
  });
  const { config } = usePrepareContractWrite({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    enabled: Boolean(address),
    functionName: "mint",
    args: [address],
    account: address,
  });
  const { write, isSuccess } = useContractWrite(config);
  const { data: claimed } = useContractRead({
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    enabled: Boolean(address),
    functionName: "balanceOf",
    chainId: polygon.id,
    args: [address],
    account: address,
  });

  useEffect(() => {
    if (parseFloat(claimed as string) > 0) {
      setIsClaimed(true);
    } else if (!isConnected) {
      setIsClaimed(false);
    } else {
      setIsClaimed(false);
    }
  }, [isConnected, address]);

  const checkEligibility = async () => {
    if (isConnected && session) {
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
        console.log("write function is undefined");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsClaimed(true);
      setIsClaimedMessage(true);
    }
  }, [isSuccess]);

  return (
    <>
      <div
        className={`overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 ${
          isClaimed
            ? "rainbow-border"
            : "border border-black/10 dark:border-white/10 hover:border-black/50 dark:hover:border-white/50"
        } backdrop-blur-xl`}
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center gap-1">
            <h2
              className={`font-semibold text-gray-900 dark:text-gray-100 text-2xl ${
                isClaimed && "rainbow-text"
              }`}
            >
              🙈 Intermediate
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col mt-4">
              <div className="flex flex-col gap-2 my-4">
                {Object.values(advantages).map((advantage, index) => (
                  <div key={index} className="flex gap-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      <>{advantage}</>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {!isClaimed && !isEligible && (
              <button
                onClick={checkEligibility}
                className="bg-blue-600 hover:bg-blue-800 dark:bg-blue-200 dark:hover:bg-blue-300 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold"
              >
                {typeof dict?.premium !== "string" && (
                  <>{dict?.premium.eligibility}</>
                )}
              </button>
            )}
            {isEligible && !isClaimed && (
              <button
                onClick={claim}
                className="bg-blue-600 hover:bg-blue-800 dark:bg-blue-200 dark:hover:bg-blue-300 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold"
              >
                {typeof dict?.premium !== "string" && (
                  <>{dict?.premium.claim}</>
                )}
              </button>
            )}
            {isClaimed && (
              <button className="disabled cursor-not-allowed bg-gray-900 dark:bg-gray-100 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold">
                {typeof dict?.premium !== "string" && (
                  <>{dict?.premium.claimed}</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {lang === "fr" ? (
        <Fail
          show={isEligibleMessage}
          title="Vous n'êtes pas éligible"
          message={`Vous avez besoin de ${holdingRequirements} TrotelCoins pour réclamer ce NFT.`}
          onClose={() => setIsEligibleMessage(false)}
        />
      ) : (
        <Fail
          show={isEligibleMessage}
          title="You're not eligible"
          message={`You need ${holdingRequirements} TrotelCoin to claim the NFT.`}
          onClose={() => setIsEligibleMessage(false)}
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
      />
      <Success
        show={isClaimedMessage}
        title={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.claimedIntermediateNFT !== "string" &&
          dict?.modals.claimedIntermediateNFT.title === "string"
            ? dict?.modals.claimedIntermediateNFT.title
            : ""
        }
        message={
          typeof dict?.modals !== "string" &&
          typeof dict?.modals.claimedIntermediateNFT !== "string" &&
          typeof dict?.modals.claimedIntermediateNFT.message === "string"
            ? dict?.modals.claimedIntermediateNFT.message
            : ""
        }
        onClose={() => setIsClaimedMessage(false)}
      />
    </>
  );
};

export default Intermediate;
