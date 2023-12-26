"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useEnsName } from "wagmi";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
  trotelCoinLearningAddress,
} from "@/data/addresses";
import { polygon } from "viem/chains";
import { Address } from "viem";
import CountUp from "react-countup";

export default function Account() {
  const { address, isConnected } = useAccount();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address],
    account: address,
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address],
    account: address,
    watch: true,
  });
  const { data: learner } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "learners",
    args: [address],
    account: address,
    watch: true,
  });
  const { data: ensName } = useEnsName({
    chainId: polygon.id,
    address: address,
  });

  const intermediateBalance: number = parseFloat(intermediate as string);
  const expertBalance: number = parseFloat(expert as string);
  let learnerTuple = learner as [any, any, any];

  const reduceAddressSize = (address: Address): Address => {
    const prefix = address.slice(0, 6) as Address;
    const suffix = address.slice(-6);
    return `${prefix}...${suffix}`;
  };

  return (
    <>
      <div className="my-20 max-w-4xl mx-auto">
        {isConnected ? (
          <>
            <h2 className="text-gray-900 dark:text-gray-100 text-2xl">
              Hello,{" "}
              <span className={`font-semibold`}>
                {ensName && ensName !== null ? (
                  <>{ensName}</>
                ) : (
                  <>{reduceAddressSize(address as Address)}</>
                )}
              </span>{" "}
              👋
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
              <div
                className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
              >
                <span
                  className={`${
                    intermediateBalance > 0 || expertBalance > 0
                      ? "text-6xl"
                      : "blur mb-4 hover:blur-none duration-500 text-xl"
                  } `}
                >
                  {intermediateBalance > 0 || expertBalance > 0 ? (
                    <>
                      <CountUp
                        start={0}
                        end={parseFloat(learnerTuple[2]) * 1e-18}
                      />{" "}
                      <span className="text-gray-900 dark:text-gray-100 text-sm">
                        TROTEL
                      </span>
                    </>
                  ) : (
                    <>Not premium</>
                  )}
                </span>
                <span>Total rewards</span>
              </div>
              <div
                className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
              >
                <span
                  className={`${
                    intermediateBalance > 0 || expertBalance > 0
                      ? "text-6xl"
                      : "blur mb-4 hover:blur-none duration-500 text-xl"
                  }`}
                >
                  {intermediateBalance > 0 || expertBalance > 0 ? (
                    <>
                      <CountUp
                        start={0}
                        end={parseFloat(learnerTuple[1] as string)}
                      />
                    </>
                  ) : (
                    <>Not premium</>
                  )}
                </span>{" "}
                <span>Quizzes answered</span>
              </div>
              <div
                className={`${
                  (intermediateBalance > 0 || expertBalance > 0) &&
                  "rainbow-border"
                } col-span-1 md:col-span-2 bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
              >
                <span
                  className={`text-6xl mb-4 font-semibold ${
                    (intermediateBalance > 0 || expertBalance > 0) &&
                    "rainbow-text"
                  }`}
                >
                  {intermediateBalance > 0 && expertBalance <= 0 && (
                    <>Intermediate</>
                  )}
                  {expertBalance > 0 && <>Expert</>}
                  {intermediateBalance <= 0 && expertBalance <= 0 && (
                    <>Beginner</>
                  )}
                </span>{" "}
                <span>Rank</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center text-gray-900 dark:text-gray-100 text-2xl">
              You need to sign in.
            </h2>
          </>
        )}
      </div>
    </>
  );
}
