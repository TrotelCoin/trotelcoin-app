"use client";

import React, { useEffect, useState } from "react";
import {
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
import { useUser, useAddress } from "@thirdweb-dev/react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";
import { supabase } from "@/lib/db";

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
  tokensEarned: number;
  totalRewardsPending: number;
  numberOfQuizzesAnswered: number;
  alreadyAnsweredSatisfaction: boolean;
  satisfactionResult: (number: number) => void;
  lang: Lang;
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
    <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mt-10">
      {typeof dict?.account !== "string" && <>{dict?.account.level}</>}
    </h2>
    <div
      className={`mt-4 bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
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
                <>{userLevel}</>
              ) : (
                <span className="animate__animated animate__flash animate__slower animate__infinite">
                  0
                </span>
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
          className="rounded-full h-2 bg-blue-500 dark:bg-blue-300"
        ></div>
      </div>
    </div>
  </>
);

const BadgesSection: React.FC<BadgesSectionProps> = ({
  isNotPremium,
  dict,
}) => {
  const address = useAddress();

  const { data: learner } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "learners",
    args: [address],
    enabled: Boolean(address),
    account: address as Address,
    watch: true,
  });
  const { data: earlyBalance } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinEarlyABI,
    address: trotelCoinEarlyAddress,
    functionName: "balanceOf",
    args: [address],
    enabled: Boolean(address),
    account: address as Address,
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
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mt-10">
        Badges
      </h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
        {badges.map(
          (badge, index) =>
            badge.condition && (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col rounded-lg py-10 px-2 text-center border border-gray-900/20 dark:border-gray-100/40`}
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
  tokensEarned,
  totalRewardsPending,
  numberOfQuizzesAnswered,
  alreadyAnsweredSatisfaction,
  satisfactionResult,
  lang,
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        {typeof dict?.account !== "string" && <>{dict?.account.hello}</>},{" "}
        <span className={`font-bold`}>
          {ensName && ensName !== null ? (
            <>{ensName}</>
          ) : (
            <>{reduceAddressSize(address)}</>
          )}
        </span>{" "}
        👋
      </h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
        <div
          className={`col-span-2 md:col-span-4 bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg p-8 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${
            alreadyAnsweredSatisfaction &&
            "hidden animate__animated animate__fadeOut"
          }`}
        >
          <div className="flex flex-col gap-4 mx-auto text-center">
            {typeof dict?.account !== "string" && (
              <span className="text-xl font-semibold">
                {dict?.account.satisfaction as string}
              </span>
            )}
            <div className="grid grid-cols-6 lg:grid-cols-11 gap-2 mx-auto mt-2">
              {Array.from(Array(11).keys()).map((number, index) => (
                <div key={index}>
                  <div
                    onClick={() => setSelectedNumber(number)}
                    className={`m-1 w-10 h-10 rounded-lg ${
                      selectedNumber === number
                        ? "bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-gray-100 dark:text-gray-900"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                    } cursor-pointer text-xl flex items-center justify-center`}
                  >
                    {number}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-1/2 mx-auto">
              <button
                onClick={() => satisfactionResult(selectedNumber as number)}
                className="mt-2 text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
              >
                {lang === "en" ? <>Submit</> : <>Envoyer</>}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            !isNotPremium && "rainbow-border"
          } col-span-2 md:col-span-4 bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span
              className={`text-4xl md:text-6xl font-semibold ${
                !isNotPremium && "rainbow-text"
              }`}
            >
              {intermediateBalance > 0 && expertBalance <= 0 && (
                <>
                  {typeof dict?.tier !== "string" && (
                    <>{dict?.tier.intermediate}</>
                  )}
                </>
              )}
              {expertBalance > 0 && (
                <>
                  {typeof dict?.tier !== "string" && <>{dict?.tier.expert}</>}
                </>
              )}
              {isNotPremium && (
                <>
                  {typeof dict?.tier !== "string" && <>{dict?.tier.beginner}</>}
                </>
              )}
            </span>{" "}
            <span>
              {typeof dict?.account !== "string" && <>{dict?.account.rank}</>}
            </span>
          </div>
        </div>
        <div
          className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span className="text-2xl md:text-4xl">
              <>
                <span className="font-semibold">
                  {balance ? (
                    <span>
                      {Math.floor(parseFloat(balance?.formatted as string))}
                    </span>
                  ) : (
                    <span className="animate__animated animate__flash animate__slower animate__infinite">
                      0
                    </span>
                  )}
                </span>
              </>
            </span>
            <span>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.balance}</>
              )}
            </span>
          </div>
        </div>
        <div
          className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span className="text-2xl md:text-4xl">
              <>
                <span className="font-semibold">
                  {numberOfQuizzesAnswered ? (
                    <span>{numberOfQuizzesAnswered}</span>
                  ) : (
                    <span className="animate__animated animate__flash animate__slower animate__infinite">
                      0
                    </span>
                  )}
                </span>
              </>
            </span>
            <span>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.quizzesAnswered}</>
              )}
            </span>
          </div>
        </div>
        <div
          className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span className="text-2xl md:text-4xl">
              <>
                <span className="font-semibold">
                  {tokensEarned ? (
                    <span>{Math.floor(tokensEarned)}</span>
                  ) : (
                    <span className="animate__animated animate__flash animate__slower animate__infinite">
                      0
                    </span>
                  )}
                </span>
              </>
            </span>
            <span>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.totalRewards}</>
              )}
            </span>
          </div>
        </div>
        <div
          className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="flex flex-col mx-auto text-center">
            <span className="text-2xl md:text-4xl">
              <>
                <span className="font-semibold">
                  {totalRewardsPending ? (
                    <span>{Math.floor(totalRewardsPending)}</span>
                  ) : (
                    <span className="animate__animated animate__flash animate__slower animate__infinite">
                      0
                    </span>
                  )}
                </span>
              </>
            </span>
            <span>
              {typeof dict?.account !== "string" && (
                <>{dict?.account.rewardsPending}</>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

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
  const [tokensEarned, setTokensEarned] = useState<number>(0);
  const [alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction] =
    useState<boolean>(true);

  const address = useAddress();
  const { user, isLoggedIn, isLoading } = useUser();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: learner } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "learners",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: ensName } = useEnsName({
    address: address as Address,
    enabled: Boolean(address),
    chainId: mainnet.id,
  });
  const { data: balance } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    enabled: Boolean(address),
    address: address as Address,
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

  useEffect(() => {
    if (localStorage.getItem("satisfactionAnswered") === null) {
      localStorage.setItem("satisfactionAnswered", "false");
    } else {
      setAlreadyAnsweredSatisfaction(
        localStorage.getItem("satisfactionAnswered") === "true"
      );
    }
  }, []);

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
    if (totalRewards && totalRewardsPending) {
      setTokensEarned(totalRewards + totalRewardsPending);
    } else if (totalRewards) {
      setTokensEarned(totalRewards);
    } else if (totalRewardsPending) {
      setTokensEarned(totalRewardsPending);
    } else {
      setTokensEarned(0);
    }
  }, [totalRewards, totalRewardsPending, address]);

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

  const satisfactionResult = async (number: number) => {
    if (Boolean(number)) {
      await fetch(`/api/database/satisfactionHandler?number=${number}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      localStorage.setItem("satisfactionAnswered", "true");
      setAlreadyAnsweredSatisfaction(true);
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
  };

  useEffect(() => {
    const fetchNewLearner = () => {
      fetch(`/api/database/newLearner?wallet=${address}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
    };

    if (address) {
      fetchNewLearner();
    }
  }, [address]);

  useEffect(() => {
    const fetchRewardsPending = () => {
      fetch(`/api/database/totalRewardsPending?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
        .then((response) => response?.json())
        .then((data) => {
          setTotalRewardsPending(data);
        });
    };

    if (address) {
      fetchRewardsPending();

      const interval = setInterval(fetchRewardsPending, 10000);

      return () => clearInterval(interval);
    } else {
      setTotalRewardsPending(0);
    }
  }, [address]);

  useEffect(() => {
    const fetchNumberOfQuizzesAnswered = () => {
      fetch(`/api/database/numberOfQuizzesAnswered?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
        .then((response) => response?.json())
        .then((data) => {
          setNumberOfQuizzesAnswered(data);
        });
    };

    if (address) {
      fetchNumberOfQuizzesAnswered();

      const interval = setInterval(fetchNumberOfQuizzesAnswered, 10000);

      return () => clearInterval(interval);
    } else {
      setNumberOfQuizzesAnswered(0);
    }
  }, [address]);

  return (
    <>
      <div className="mx-auto">
        {address && isLoggedIn ? (
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
              tokensEarned={tokensEarned}
              totalRewardsPending={totalRewardsPending}
              numberOfQuizzesAnswered={numberOfQuizzesAnswered}
              alreadyAnsweredSatisfaction={alreadyAnsweredSatisfaction}
              satisfactionResult={satisfactionResult}
              lang={lang}
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
            <p className="text-center text-gray-900 dark:text-gray-100 text-xl">
              {typeof dict?.modals !== "string" &&
                typeof dict?.modals.connectWallet !== "string" && (
                  <>{dict?.modals.connectWallet.message}</>
                )}
            </p>
          </>
        )}
      </div>
    </>
  );
}
