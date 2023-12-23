"use client";

import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
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
import Fail from "@/app/ui/modals/fail";
import Success from "@/app/ui/modals/success";

const advantages = {
  1: "Early access to experimental features and projects",
  2: "Join an exclusive crypto community to network and more",
};

const holdingRequirements: number = 50000;
const TrotelCoinAddress: `0x${string}` =
  "0x85057d5a8d063f9075ba963101d76352051675e5";
const TrotelCoinExpertAddress: `0x${string}` =
  "0x41D5DD5Bf408bd3aE164594C6b4a4718f1f5C9bF";

const Expert = () => {
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [isEligibleMessage, setIsEligibleMessage] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [isNotConnected, setIsNotConnected] = useState<boolean>(false);
  const [isNotConnectedMessage, setIsNotConnectedMessage] =
    useState<boolean>(false);
  const [isClaimedMessage, setIsClaimedMessage] = useState<boolean>(false);
  const [isEligibleMessageSuccess, setIsEligibleMessageSuccess] =
    useState<boolean>(false);

  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address: address,
    chainId: polygon.id,
    token: TrotelCoinAddress,
    watch: true,
  });
  const { config } = usePrepareContractWrite({
    chainId: polygon.id,
    address: TrotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "mint",
    args: [address],
    account: address,
  });
  const { write, isSuccess } = useContractWrite(config);
  const { data: claimed } = useContractRead({
    address: TrotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "balanceOf",
    chainId: polygon.id,
    args: [address],
    account: address,
  });

  useEffect(() => {
    if (parseFloat(claimed as string) > 0) {
      setIsClaimed(true);
    }
  }, [isConnected, address]);

  const checkEligibility = async () => {
    if (isConnected) {
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
            : "border border-black/10 dark:border-white/10"
        } backdrop-blur-xl`}
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-900 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>

            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Expert
            </h2>
            <span className="text-gray-900 dark:text-gray-100 font-semibold">
              •
            </span>
            <span className="text-gray-900 dark:text-gray-100 font-semibold">
              {String(holdingRequirements)} TROTEL
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center mt-4">
              <p className="text-gray-900 dark:text-gray-100">
                You will get the following benefits :
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                {Object.values(advantages).map((advantage, index) => (
                  <div key={index} className="flex gap-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      • {advantage}
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
                Check eligibility
              </button>
            )}
            {isEligible && !isClaimed && (
              <button
                onClick={claim}
                className="bg-blue-600 hover:bg-blue-800 dark:bg-blue-200 dark:hover:bg-blue-300 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold"
              >
                Claim
              </button>
            )}
            {isClaimed && (
              <button className="disabled cursor-not-allowed bg-gray-900 dark:bg-gray-100 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold">
                Already claimed
              </button>
            )}
          </div>
        </div>
      </div>
      <Fail
        show={isEligibleMessage}
        title="You're not eligible"
        message={`You need ${holdingRequirements} TrotelCoin to claim the NFT.`}
        onClose={() => setIsEligibleMessage(false)}
      />
      <Fail
        show={isNotConnectedMessage}
        title="Connect your wallet"
        message={`You need to connect your wallet to claim the NFT.`}
        onClose={() => setIsNotConnectedMessage(false)}
      />
      <Success
        show={isEligibleMessageSuccess}
        title="You're eligible"
        message="You can claim the NFT now!"
        onClose={() => setIsEligibleMessageSuccess(false)}
      />
      <Success
        show={isClaimedMessage}
        title="You claimed the NFT"
        message="You're now an expert user!"
        onClose={() => setIsClaimedMessage(false)}
      />
    </>
  );
};

export default Expert;
