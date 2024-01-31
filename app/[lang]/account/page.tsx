"use client";

import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useEnsName,
  useBalance,
  useContractEvent,
} from "wagmi";
import { Address, Log } from "viem";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { reduceAddressSize } from "@/utils/utils";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
  trotelCoinLearningAddress,
  trotelCoinAddress,
  trotelCoinEarlyAddress,
} from "@/data/addresses";
import { mainnet, polygon } from "viem/chains";
import CountUp from "react-countup";
import { useSession } from "next-auth/react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";

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
  totalRewardsPending: number;
  numberOfQuizzesAnswered: number;
}

interface BadgesSectionProps {
  isNotPremium: boolean;
  dict: DictType | null;
}

type MyLog = Log & {
  args: {
    learner: Address;
    rewardsClaimed: string;
  };
};

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
                <CountUp start={0} end={userLevel} duration={2} />
              ) : (
                <span className="animate-pulse">0</span>
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
        className={`overflow-hidden h-2 text-xs bg-gray-600 mt-2 dark:bg-gray-400 flex rounded-full ${
          isNotPremium && "mt-4"
        }`}
      >
        <div
          style={{
            width: isNotPremium ? "0%" : `${width}%`,
            transition: "width 1s ease-in",
          }}
          className="rounded-full h-2 bg-yellow-500 dark:bg-yellow-300"
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
  const { data: earlyBalance } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinEarlyABI,
    address: trotelCoinEarlyAddress,
    functionName: "balanceOf",
    args: [address],
    enabled: Boolean(address),
    account: address,
    watch: true,
  });

  const learnerTuple = learner as [any, any, any];
  const early = parseFloat(earlyBalance as string) > 0;

  const badges = [
    {
      id: 1,
      name: typeof dict?.badges !== "string" && dict?.badges.beginner,
      image: "🐣",
      condition: true,
    },
    {
      id: 2,
      name: typeof dict?.badges !== "string" && dict?.badges.tenQuizzes,
      image: "🌱",
      condition:
        learnerTuple &&
        learnerTuple.length === 3 &&
        learnerTuple[1] &&
        parseFloat(learnerTuple[1] as string) >= 10,
    },
    {
      id: 3,
      name: typeof dict?.badges !== "string" && dict?.badges.hundredTrotelCoins,
      image: "🤑",
      condition:
        learnerTuple &&
        learnerTuple.length === 3 &&
        learnerTuple[2] &&
        parseFloat(learnerTuple[2] as string) * 1e-18 >= 100,
    },
    {
      id: 4,
      name: typeof dict?.badges !== "string" && dict?.badges.early,
      image: "🤫",
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
                    className={`text-gray-900 dark:text-gray-100 text-4xl ${
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
  totalRewardsPending,
  numberOfQuizzesAnswered,
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
                {balance ? (
                  <CountUp
                    start={0}
                    end={parseFloat(balance?.formatted as string)}
                    duration={2}
                  />
                ) : (
                  <span className="animate-pulse">0</span>
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
                {learnerTuple && learnerTuple.length >= 3 && learnerTuple[2] ? (
                  <CountUp
                    start={0}
                    end={
                      parseFloat(learnerTuple[2]) * 1e-18 + totalRewardsPending
                    }
                    duration={2}
                  />
                ) : (
                  <span className="animate-pulse">0</span>
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
                {learnerTuple && learnerTuple.length >= 2 && learnerTuple[1] ? (
                  <CountUp
                    start={0}
                    end={numberOfQuizzesAnswered}
                    duration={2}
                  />
                ) : (
                  <span className="animate-pulse">0</span>
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
  const [logs, setLogs] = useState<MyLog[]>([]);
  const [totalRewardsPending, setTotalRewardsPending] = useState<number>(0);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] =
    useState<number>(0);

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
  useContractEvent({
    chainId: polygon.id,
    address: trotelCoinLearningAddress,
    abi: trotelCoinLearningABI,
    eventName: "RewardsClaimed",
    listener(logs) {
      setLogs(logs as MyLog[]);
    },
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

  useEffect(() => {
    fetch(
      `/api/database/totalRewardsPending?wallet=${address}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalRewardsPending(data);
      });
  }, [address]);

  useEffect(() => {
    fetch(
      `/api/database/numberOfQuizzesAnswered?wallet=${address}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNumberOfQuizzesAnswered(data);
      });
  }, [address]);

  const tokensEarned = totalRewards + totalRewardsPending;

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
              totalRewardsPending={totalRewardsPending}
              numberOfQuizzesAnswered={numberOfQuizzesAnswered}
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
