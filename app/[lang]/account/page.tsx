"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useEnsName, useBalance } from "wagmi";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { reduceAddressSize } from "@/utils/utils";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
  trotelCoinLearningAddress,
  trotelCoinAddress,
} from "@/data/addresses";
import { mainnet, polygon } from "viem/chains";
import { Address } from "viem";
import CountUp from "react-countup";
import { useSession } from "next-auth/react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface LevelSectionProps {
  isNotPremium: boolean;
  userLevel: number;
  tokensNeededForNextLevel: number;
  width: number;
  dict: DictType | null;
}

interface HeaderProps {
  ensName: string | null;
  address: Address;
  isNotPremium: boolean;
  learnerTuple: [any, any, any];
  intermediateBalance: number;
  expertBalance: number;
  balance: any;
  dict: DictType | null;
}

interface BadgesSectionProps {
  isNotPremium: boolean;
  dict: DictType | null;
}

const calculateUserLevelAndTokens = (tokensEarned: number) => {
  let userLevel = 1;
  let tokensRequiredForCurrentLevel = 10;
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
  tokensEarned: number,
  tokensNeededForNextLevel: number,
  nextLevelIncrease: number
) => {
  const progressTowardsNextLevel =
    tokensEarned - tokensRequiredForCurrentLevel + nextLevelIncrease;
  const totalTokensForNextLevel =
    tokensNeededForNextLevel + progressTowardsNextLevel;

  return (progressTowardsNextLevel / totalTokensForNextLevel) * 100;
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
  dict,
}) => (
  <>
    <h2 className="text-gray-900 dark:text-gray-100 text-xl mt-10">
      {typeof dict?.account !== "string" && <>{dict?.account.level}</>}
    </h2>
    <div
      className={`mt-4 bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
    >
      <div className="flex justify-between">
        <div
          className={`flex gap-1 ${
            isNotPremium && "blur hover:blur-none duration-500"
          }`}
        >
          {isNotPremium && (
            <p>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.notPremium}</>
              )}
            </p>
          )}
          {!isNotPremium && (
            <>
              <p>
                {typeof dict?.account !== "string" && (
                  <>{dict?.account.youAreLevel}</>
                )}
              </p>
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
            ? `${tokensNeededForNextLevel.toFixed(0)} ${
                typeof dict?.account !== "string" &&
                dict?.account.trotelCoinsLeft
              }`
            : `${
                typeof dict?.account !== "string" && dict?.account.notPremium
              }`}
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

const BadgesSection: React.FC<BadgesSectionProps> = ({
  isNotPremium,
  dict,
}) => {
  const { address } = useAccount();

  const { data: quizzesAnswered } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "getNumberOfQuizzesAnswer",
    enabled: Boolean(address),
    args: [address],
    watch: true,
  });

  const { data: learner } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "learners",
    args: [address],
    enabled: Boolean(address),
    account: address,
    watch: true,
  });

  const learnerTuple = learner as [any, any, any];
  const early = false; // to change

  const badges = [
    {
      id: 1,
      name: typeof dict?.badges !== "string" && dict?.badges.beginner,
      image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
      condition: true,
    },
    {
      id: 2,
      name: typeof dict?.badges !== "string" && dict?.badges.tenQuizzes,
      image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
      ),
      condition:
        Boolean(quizzesAnswered) && parseFloat(quizzesAnswered as string) >= 10,
    },
    {
      id: 3,
      name: typeof dict?.badges !== "string" && dict?.badges.hundredTrotelCoins,
      image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      ),
      condition:
        learnerTuple &&
        learnerTuple.length === 3 &&
        parseFloat(learnerTuple[2] as string) * 1e-18 >= 100,
    },
    {
      id: 4,
      name: typeof dict?.badges !== "string" && dict?.badges.early,
      image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      condition: early,
    },
  ];

  return (
    <>
      <h2 className="text-gray-900 dark:text-gray-100 text-xl mt-10">Badges</h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
        {badges.map(
          (badge) =>
            badge.condition && (
              <div
                key={badge.id}
                className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col rounded-lg py-10 px-2 text-center border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50`}
              >
                <div className="flex flex-col gap-2 text-center items-center">
                  <span
                    className={`text-blue-600 dark:text-blue-200 ${
                      isNotPremium && "blur hover:blur-none duration-500"
                    }`}
                  >
                    {!isNotPremium && badge.image}
                  </span>
                  <span
                    className={`text-sm ${
                      isNotPremium && "blur hover:blur-none duration-500"
                    }`}
                  >
                    {!isNotPremium ? (
                      <>{badge.name}</>
                    ) : typeof dict?.account !== "string" &&
                      typeof dict?.account.notPremium === "string" ? (
                      <>{dict?.account.notPremium}</>
                    ) : (
                      <>Loading...</>
                    )}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

const Header: React.FC<HeaderProps> = ({
  ensName,
  address,
  isNotPremium,
  learnerTuple,
  intermediateBalance,
  expertBalance,
  balance,
  dict,
}) => (
  <>
    <h2 className="text-gray-900 dark:text-gray-100 text-xl">
      {typeof dict?.account !== "string" && <>{dict?.account.hello}</>},{" "}
      <span className={`font-semibold`}>
        {ensName && ensName !== null ? (
          <>{ensName}</>
        ) : (
          <>{reduceAddressSize(address)}</>
        )}
      </span>{" "}
      👋
    </h2>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
      <div
        className={`${
          !isNotPremium && "rainbow-border"
        } col-span-1 md:col-span-3 bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span
          className={`text-6xl mb-4 font-semibold ${
            !isNotPremium && "rainbow-text"
          }`}
        >
          {intermediateBalance > 0 && expertBalance <= 0 && (
            <>
              {typeof dict?.tier !== "string" && <>{dict?.tier.intermediate}</>}
            </>
          )}
          {expertBalance > 0 && (
            <>{typeof dict?.tier !== "string" && <>{dict?.tier.expert}</>}</>
          )}
          {isNotPremium && (
            <>{typeof dict?.tier !== "string" && <>{dict?.tier.beginner}</>}</>
          )}
        </span>{" "}
        <span>
          {typeof dict?.account !== "string" && <>{dict?.account.rank}</>}
        </span>
      </div>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span
          className={`${
            !isNotPremium
              ? "text-4xl"
              : "blur mb-4 hover:blur-none duration-500 text-xl"
          } `}
        >
          {!isNotPremium ? (
            <>
              <span className="font-semibold">
                {learnerTuple && learnerTuple.length >= 3 ? (
                  <CountUp
                    start={0}
                    end={parseFloat(balance?.formatted as string)}
                  />
                ) : (
                  <>0</>
                )}
              </span>
            </>
          ) : (
            <>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.notPremium}</>
              )}
            </>
          )}
        </span>
        <span>
          {typeof dict?.account !== "string" && <>{dict?.account.balance}</>}
        </span>
      </div>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span
          className={`${
            !isNotPremium
              ? "text-4xl"
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
            </>
          ) : (
            <>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.notPremium}</>
              )}
            </>
          )}
        </span>
        <span>
          {typeof dict?.account !== "string" && (
            <>{dict?.account.totalRewards}</>
          )}
        </span>
      </div>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span
          className={`${
            !isNotPremium
              ? "text-4xl"
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
            <>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.notPremium}</>
              )}
            </>
          )}
        </span>{" "}
        <span>
          {typeof dict?.account !== "string" && (
            <>{dict?.account.quizzesAnswered}</>
          )}
        </span>
      </div>
    </div>
  </>
);

export default function Account({
  params: { lang },
}: {
  params: { lang: Lang };
}) {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const [totalRewards, setTotalRewards] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const { address, isConnected } = useAccount();
  const { data: session, status } = useSession();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address],
    account: address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address],
    account: address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: learner } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "learners",
    args: [address],
    account: address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: ensName } = useEnsName({
    address: address,
    enabled: Boolean(address),
    chainId: mainnet.id,
  });
  const { data: balance } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    enabled: Boolean(address),
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
    tokensEarned,
    tokensNeededForNextLevel,
    nextLevelIncrease
  );
  incrementWidth(progressPercentage, setWidth);

  const isNotPremium = intermediateBalance <= 0 && expertBalance <= 0;

  return (
    <>
      <div className="my-20 max-w-4xl mx-auto">
        {isConnected && session ? (
          <>
            <Header
              ensName={ensName?.toString() as string}
              address={address?.toString() as Address}
              isNotPremium={isNotPremium}
              learnerTuple={learnerTuple}
              intermediateBalance={intermediateBalance}
              expertBalance={expertBalance}
              balance={balance}
              dict={dict}
            />
            <LevelSection
              isNotPremium={isNotPremium}
              userLevel={userLevel}
              tokensNeededForNextLevel={tokensNeededForNextLevel}
              width={width}
              dict={dict}
            />
            <BadgesSection isNotPremium={isNotPremium} dict={dict} />
          </>
        ) : (
          <>
            <h2 className="text-center text-gray-900 dark:text-gray-100 text-xl">
              {typeof dict?.modals !== "string" &&
                typeof dict?.modals.connectWallet !== "string" && (
                  <>{dict?.modals.connectWallet.message}</>
                )}
            </h2>
          </>
        )}
      </div>
    </>
  );
}
