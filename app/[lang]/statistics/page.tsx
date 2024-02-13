"use client";

import { DictType, Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getDictionary } from "../dictionaries";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { trotelCoinLearningAddress } from "@/data/addresses";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";

interface TheAlgorithmSectionProps {
  dict: DictType | null;
  trotelCoinsDistributed: number;
}

const TheAlgorithmSection: React.FC<TheAlgorithmSectionProps> = ({
  dict,
  trotelCoinsDistributed,
}) => {
  const [remainingRewards, setRemainingRewards] = useState<number | null>(null);
  const [numberOfLearners, setNumberOfLearners] = useState<number | null>(null);
  const [trotelCoinsPending, setTrotelCoinsPending] = useState<number | null>(
    null
  );
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);
  const [maxStreak, setMaxStreak] = useState<number | null>(null);

  useEffect(() => {
    const fetchRemainingRewards = async () => {
      const response = await fetch("/api/database/remainingRewards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const remainingRewards = await response?.json();
      setRemainingRewards(remainingRewards);
    };

    fetchRemainingRewards();
  }, []);

  useEffect(() => {
    const fetchTrotelCoinsPending = async () => {
      const response = await fetch("/api/database/trotelCoinsPending", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const trotelCoinsPending = await response?.json();
      setTrotelCoinsPending(trotelCoinsPending);
    };

    fetchTrotelCoinsPending();
  }, []);

  useEffect(() => {
    const fetchNumberOfQuizzesAnswered = async () => {
      const response = await fetch(
        "/api/database/totalNumberOfQuizzesAnswered",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );
      const numberOfQuizzesAnswered = await response?.json();
      setNumberOfQuizzesAnswered(numberOfQuizzesAnswered);
    };

    fetchNumberOfQuizzesAnswered();
  }, []);

  useEffect(() => {
    // finding number of learners by taking max id in the table "learners"

    const fetchNumberOfLearners = async () => {
      const response = await fetch("/api/database/numberOfLearners", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const numberOfLearners = await response?.json();
      setNumberOfLearners(numberOfLearners);
    };

    fetchNumberOfLearners();
  }, []);

  useEffect(() => {
    const fetchMaxStreak = async () => {
      const response = await fetch("/api/database/totalMaxStreak", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const { maxStreak } = await response.json();
      setMaxStreak(maxStreak);
    };

    fetchMaxStreak();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
          {typeof dict?.algorithm !== "string" && <>{dict?.algorithm.title}</>}
        </h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {trotelCoinsDistributed ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(trotelCoinsDistributed)}
                    duration={2}
                  />{" "}
                  <span className="hidden md:inline">💸</span>
                </>
              ) : (
                <span className="animate-pulse">
                  0 <span className="hidden md:inline">💸</span>
                </span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.trotelCoinsDistributed}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {trotelCoinsPending ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(trotelCoinsPending)}
                    duration={2}
                  />{" "}
                  <span className="hidden md:inline">💰</span>
                </>
              ) : (
                <span className="animate-pulse">
                  0 <span className="hidden md:inline">💰</span>
                </span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.trotelCoinsPending}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {numberOfQuizzesAnswered ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(numberOfQuizzesAnswered)}
                    duration={2}
                  />{" "}
                  <span className="hidden md:inline">📚</span>
                </>
              ) : (
                <span className="animate-pulse">
                  0 <span className="hidden md:inline">📚</span>
                </span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.numberOfQuizzesAnswered}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {remainingRewards ? (
                <>
                  <CountUp
                    start={0}
                    end={remainingRewards}
                    decimals={1}
                    duration={2}
                  />{" "}
                  <span className="hidden md:inline">⏳</span>
                </>
              ) : (
                <span className="animate-pulse">
                  0 <span className="hidden md:inline">⏳</span>
                </span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.remainingCycle}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {remainingRewards ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(remainingRewards / 10)}
                    duration={2}
                  />{" "}
                  {"< 🧠 <"}
                  <CountUp
                    start={0}
                    end={Math.floor(remainingRewards / 4)}
                    duration={2}
                  />
                </>
              ) : (
                <span className="animate-pulse">{"0 < 🧠 < 0"}</span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.remainingTokens}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {maxStreak ? (
                <>
                  <CountUp start={0} end={maxStreak} duration={2} />{" "}
                  <span className="hidden md:inline">🔥</span>
                </>
              ) : (
                <span className="animate-pulse">
                  0 <span className="hidden md:inline">🔥</span>
                </span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.maxStreak}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {numberOfLearners ? (
                <>
                  <CountUp start={0} end={numberOfLearners} duration={2} />{" "}
                  <span className="hidden md:inline">👨‍💻</span>
                </>
              ) : (
                <span className="animate-pulse">
                  0 <span className="hidden md:inline">👨‍💻</span>
                </span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.numberOfLearners}</>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const Statistics = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const { data: remainingTokens } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "remainingTokens",
    watch: true,
  });
  const { data: remainingTime } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "calculateRemainingRewardsPeriod",
    watch: true,
  });
  const { data: trotelCoinsDistributed } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "totalRewards",
    watch: true,
  });

  return (
    <>
      <TheAlgorithmSection
        dict={dict}
        trotelCoinsDistributed={parseFloat(
          (parseFloat(trotelCoinsDistributed as string) / 1e18).toFixed(0)
        )}
      />
    </>
  );
};

export default Statistics;
