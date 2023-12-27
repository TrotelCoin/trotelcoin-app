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

interface LevelSectionProps {
  isNotPremium: boolean;
  userLevel: number;
  tokensNeededForNextLevel: number;
  width: number;
}

interface HeaderProps {
  ensName: string | null;
  address: Address;
  isNotPremium: boolean;
  learnerTuple: [any, any, any];
  intermediateBalance: number;
  expertBalance: number;
}

const reduceAddressSize = (address: Address): Address => {
  const prefix = address.slice(0, 6) as Address;
  const suffix = address.slice(-6);
  return `${prefix}...${suffix}`;
};

const calculateUserLevelAndTokens = (tokensEarned: number) => {
  let userLevel = 1;
  let tokensRequiredForCurrentLevel = 50;
  const levelIntervalIncrease = 10;
  let nextLevelIncrease = levelIntervalIncrease;

  while (tokensEarned >= tokensRequiredForCurrentLevel) {
    if (userLevel % levelIntervalIncrease === 0) {
      tokensRequiredForCurrentLevel *= 2;
      nextLevelIncrease += levelIntervalIncrease;
    }

    tokensRequiredForCurrentLevel += nextLevelIncrease;
    userLevel++;
  }

  let tokensNeededForNextLevel = tokensRequiredForCurrentLevel - tokensEarned;

  if (tokensNeededForNextLevel <= 0) {
    tokensNeededForNextLevel =
      tokensRequiredForCurrentLevel + nextLevelIncrease - tokensEarned;
  }

  userLevel = Math.max(userLevel, 1);

  return {
    userLevel,
    tokensNeededForNextLevel,
    tokensRequiredForCurrentLevel,
    nextLevelIncrease,
  };
};

const calculateProgressPercentage = (
  tokensRequiredForCurrentLevel: number,
  tokensNeededForNextLevel: number,
  tokensEarned: number,
  nextLevelIncrease: number
) => {
  return (
    ((tokensRequiredForCurrentLevel - tokensNeededForNextLevel + tokensEarned) /
      (tokensRequiredForCurrentLevel - nextLevelIncrease)) *
    100
  );
};

const incrementWidth = (
  progressPercentage: number,
  setWidth: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((oldWidth: number) => {
        if (oldWidth < progressPercentage) {
          return oldWidth + 1;
        } else {
          clearInterval(interval);
          return oldWidth;
        }
      });
    }, 1);

    return () => clearInterval(interval);
  }, [progressPercentage]);
};

const LevelSection: React.FC<LevelSectionProps> = ({
  isNotPremium,
  userLevel,
  tokensNeededForNextLevel,
  width,
}) => (
  <>
    <h2 className="text-gray-900 dark:text-gray-100 text-xl mt-10">Level</h2>
    <div
      className={`mt-4 bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
    >
      <div className="flex justify-between">
        <div
          className={`flex gap-1 ${
            isNotPremium && "blur hover:blur-none duration-500"
          }`}
        >
          {isNotPremium && <p>Not premium</p>}
          {!isNotPremium && (
            <>
              <p>You are level</p>
              {userLevel ? (
                <CountUp start={0} end={userLevel} duration={5} />
              ) : (
                <>0</>
              )}
            </>
          )}
        </div>
        <p
          className={`hidden md:block ${
            isNotPremium && "blur hover:blur-none duration-500"
          }`}
        >
          {tokensNeededForNextLevel > 0 && !isNotPremium
            ? `${tokensNeededForNextLevel.toFixed(0)} TrotelCoins left`
            : "Not premium"}
        </p>
      </div>
      <div
        className={`overflow-hidden h-2 text-xs bg-gray-400 mt-2 dark:bg-gray-200 flex rounded-full ${
          isNotPremium && "mt-4"
        }`}
      >
        <div
          style={{
            width: isNotPremium ? "0%" : `${width}%`,
            transition: "width 1s ease-in",
          }}
          className="rounded-full h-2 bg-blue-600 dark:bg-blue-400"
        ></div>
      </div>
    </div>
  </>
);

const BadgesSection = () => (
  <>
    <h2 className="text-gray-900 dark:text-gray-100 text-xl mt-10">Badges</h2>
    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        Coming soon...
      </div>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        Coming soon...
      </div>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        Coming soon...
      </div>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        Coming soon...
      </div>
    </div>
  </>
);

const Header: React.FC<HeaderProps> = ({
  ensName,
  address,
  isNotPremium,
  learnerTuple,
  intermediateBalance,
  expertBalance,
}) => (
  <>
    <h2 className="text-gray-900 dark:text-gray-100 text-xl">
      Hello,{" "}
      <span className={`font-semibold`}>
        {ensName && ensName !== null ? (
          <>{ensName}</>
        ) : (
          <>{reduceAddressSize(address)}</>
        )}
      </span>{" "}
      👋
    </h2>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
      <div
        className={`${
          !isNotPremium && "rainbow-border"
        } col-span-1 md:col-span-2 bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span
          className={`text-6xl mb-4 font-semibold ${
            !isNotPremium && "rainbow-text"
          }`}
        >
          {intermediateBalance > 0 && expertBalance <= 0 && <>Intermediate</>}
          {expertBalance > 0 && <>Expert</>}
          {isNotPremium && <>Beginner</>}
        </span>{" "}
        <span>Rank</span>
      </div>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span
          className={`${
            !isNotPremium
              ? "text-6xl"
              : "blur mb-4 hover:blur-none duration-500 text-xl"
          } `}
        >
          {!isNotPremium ? (
            <>
              <span className="font-semibold">
                {learnerTuple && learnerTuple.length >= 3 ? (
                  <CountUp
                    start={0}
                    end={parseFloat(learnerTuple[2]) * 1e-18}
                  />
                ) : (
                  <>0</>
                )}
              </span>
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
            !isNotPremium
              ? "text-6xl"
              : "blur mb-4 hover:blur-none duration-500 text-xl"
          }`}
        >
          {!isNotPremium ? (
            <>
              <span className="font-semibold">
                {learnerTuple && learnerTuple.length >= 2 ? (
                  <CountUp
                    start={0}
                    end={parseFloat(learnerTuple[1] as string)}
                  />
                ) : (
                  <>0</>
                )}
              </span>
            </>
          ) : (
            <>Not premium</>
          )}
        </span>{" "}
        <span>Quizzes answered</span>
      </div>
    </div>
  </>
);

export default function Account() {
  const [totalRewards, setTotalRewards] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

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
  const learnerTuple = learner as [any, any, any];

  useEffect(() => {
    if (
      learnerTuple &&
      learnerTuple.length >= 3 &&
      learnerTuple[2] !== undefined
    ) {
      const rewards = parseFloat(learnerTuple[2] as string) * 1e-18;
      setTotalRewards(rewards || 0);
    }
  }, [learnerTuple]);

  const tokensEarned = totalRewards;

  const {
    userLevel,
    tokensNeededForNextLevel,
    tokensRequiredForCurrentLevel,
    nextLevelIncrease,
  } = calculateUserLevelAndTokens(tokensEarned);
  const progressPercentage = calculateProgressPercentage(
    tokensRequiredForCurrentLevel,
    tokensNeededForNextLevel,
    tokensEarned,
    nextLevelIncrease
  );
  incrementWidth(progressPercentage, setWidth);

  const isNotPremium = intermediateBalance <= 0 && expertBalance <= 0;

  return (
    <>
      <div className="my-20 max-w-4xl mx-auto">
        {isConnected ? (
          <>
            <Header
              ensName={ensName?.toString() as string}
              address={address?.toString() as Address}
              isNotPremium={isNotPremium}
              learnerTuple={learnerTuple}
              intermediateBalance={intermediateBalance}
              expertBalance={expertBalance}
            />
            <LevelSection
              isNotPremium={isNotPremium}
              userLevel={userLevel}
              tokensNeededForNextLevel={tokensNeededForNextLevel}
              width={width}
            />
            <BadgesSection />
          </>
        ) : (
          <>
            <h2 className="text-center text-gray-900 dark:text-gray-100 text-xl">
              You need to sign in.
            </h2>
          </>
        )}
      </div>
    </>
  );
}
