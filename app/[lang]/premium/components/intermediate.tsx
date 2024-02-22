"use client";

import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import React, { useEffect, useState } from "react";
import { useBalance, useContractRead, Address } from "wagmi";
import { polygon } from "wagmi/chains";
import "animate.css";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "../../components/modals/success";
import {
  trotelCoinAddress,
  trotelCoinIntermediateAddress,
} from "@/data/web3/addresses";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import {
  useAddress,
  useUser,
  useContractWrite,
  useContract,
} from "@thirdweb-dev/react";
import Tilt from "react-parallax-tilt";

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
  const [dict, setDict] = useState<DictType | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

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

  const address = useAddress();
  const { user, isLoggedIn, isLoading } = useUser();
  const { contract } = useContract(
    trotelCoinIntermediateAddress,
    trotelCoinIntermediateABI
  );
  const { data } = useBalance({
    address: address as Address,
    chainId: polygon.id,
    token: trotelCoinAddress,
    enabled: Boolean(address),
    watch: true,
  });
  const {
    mutateAsync,
    isLoading: isLoadingWrite,
    isSuccess,
    isError,
  } = useContractWrite(contract, "mint");
  const { data: claimed } = useContractRead({
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    enabled: Boolean(address),
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
    if (address && isLoggedIn) {
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
        fetch(`/api/database/claimIntermediate?wallet=${address}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
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
        glareMaxOpacity={0.45}
        perspective={800}
        scale={1.05}
      >
        <div
          className={`overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 ${
            isClaimed
              ? "rainbow-border"
              : "border border-gray-900/20 dark:border-gray-100/20"
          } backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-1">
              <div
                className={`font-semibold text-gray-900 dark:text-gray-100 text-2xl ${
                  isClaimed && "rainbow-text"
                }`}
              >
                🙈 Intermediate
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
                  className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-300 dark:hover:bg-blue-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold"
                >
                  {typeof dict?.premium !== "string" && (
                    <>{dict?.premium.eligibility}</>
                  )}
                </button>
              )}
              {isEligible && !isClaimed && (
                <button
                  onClick={async () =>
                    await mutateAsync({ args: [address as Address] })
                  }
                  className="!bg-blue-500 hover:!bg-blue-400 dark:!bg-blue-300 dark:hover:!bg-blue-400 focus:!border-blue-500 dark:focus:!border-blue-300 !text-sm !px-6 !py-2 !text-gray-100 dark:!text-gray-900 !rounded-lg !font-semibold"
                  style={{}}
                >
                  {typeof dict?.premium !== "string" && (
                    <>{dict?.premium.claim}</>
                  )}
                </button>
              )}
              {isClaimed && (
                <button className="disabled cursor-not-allowed bg-gray-800 dark:bg-gray-200 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold">
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
      <Fail
        show={errorMessage}
        lang={lang}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={lang === "en" ? "An error occured" : "Une erreur a survenue"}
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
        lang={lang}
      />
    </>
  );
};

export default Intermediate;
