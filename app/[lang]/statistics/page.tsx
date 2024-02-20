"use client";

import { DictType, Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import { getDictionary } from "../dictionaries";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { trotelCoinLearningAddress } from "@/data/web3/addresses";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";
import { supabase } from "@/lib/supabase/db";

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
        cache: "no-store",
      });
      const remainingRewards = await response?.json();
      if (remainingRewards) {
        setRemainingRewards(remainingRewards);
      } else {
        setRemainingRewards(0);
      }
    };

    fetchRemainingRewards();

    const interval = setInterval(fetchRemainingRewards, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTrotelCoinsPending = async () => {
      const response = await fetch("/api/database/trotelCoinsPending", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const trotelCoinsPending = await response?.json();
      if (trotelCoinsPending) {
        setTrotelCoinsPending(trotelCoinsPending);
      } else {
        setTrotelCoinsPending(0);
      }
    };

    fetchTrotelCoinsPending();

    const interval = setInterval(fetchTrotelCoinsPending, 10000);

    return () => clearInterval(interval);
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
          cache: "no-store",
        }
      );
      const numberOfQuizzesAnswered = await response?.json();
      if (numberOfQuizzesAnswered) {
        setNumberOfQuizzesAnswered(numberOfQuizzesAnswered);
      } else {
        setNumberOfQuizzesAnswered(0);
      }
    };

    fetchNumberOfQuizzesAnswered();

    const interval = setInterval(fetchNumberOfQuizzesAnswered, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // finding number of learners by taking max id in the table "learners"

    const fetchNumberOfLearners = async () => {
      const response = await fetch("/api/database/numberOfLearners", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const numberOfLearners = await response?.json();
      if (numberOfLearners) {
        setNumberOfLearners(numberOfLearners);
      } else {
        setNumberOfLearners(0);
      }
    };

    fetchNumberOfLearners();

    const interval = setInterval(fetchNumberOfLearners, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMaxStreak = async () => {
      const response = await fetch("/api/database/totalMaxStreak", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const maxStreak = await response?.json();
      if (maxStreak) {
        setMaxStreak(maxStreak);
      } else {
        setMaxStreak(0);
      }
    };

    fetchMaxStreak();

    const interval = setInterval(fetchMaxStreak, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl">
          {typeof dict?.algorithm !== "string" && <>{dict?.algorithm.title}</>}
        </h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {trotelCoinsDistributed ? (
                <>
                  {Math.floor(trotelCoinsDistributed)}{" "}
                  <span className="hidden md:inline">💸</span>
                </>
              ) : (
                <span className="animate__animated animate__flash animate__slower animate__infinite">
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
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {trotelCoinsPending ? (
                <>
                  {Math.floor(trotelCoinsPending)}{" "}
                  <span className="hidden md:inline">💰</span>
                </>
              ) : (
                <span className="animate__animated animate__flash animate__slower animate__infinite">
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
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {numberOfQuizzesAnswered ? (
                <>
                  {Math.floor(numberOfQuizzesAnswered)}{" "}
                  <span className="hidden md:inline">📚</span>
                </>
              ) : (
                <span className="animate__animated animate__flash animate__slower animate__infinite">
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
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {remainingRewards ? (
                <>
                  {Math.floor(remainingRewards)}{" "}
                  <span className="hidden md:inline">⏳</span>
                </>
              ) : (
                <span className="animate__animated animate__flash animate__slower animate__infinite">
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
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {remainingRewards ? (
                <>
                  {Math.floor(remainingRewards / 10)} {"< 🧠 <"}
                  {Math.floor(remainingRewards / 4)}
                </>
              ) : (
                <span className="animate__animated animate__flash animate__slower animate__infinite">
                  {"0 < 🧠 < 0"}
                </span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.remainingTokens}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {maxStreak ? (
                <>
                  {maxStreak} <span className="hidden md:inline">🔥</span>
                </>
              ) : (
                <span className="animate__animated animate__flash animate__slower animate__infinite">
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
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-2xl md:text-4xl">
              {numberOfLearners ? (
                <>
                  {numberOfLearners}{" "}
                  <span className="hidden md:inline">👨‍💻</span>
                </>
              ) : (
                <span className="animate__animated animate__flash animate__slower animate__infinite">
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
