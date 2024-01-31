"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/ui/interface/comingSoon";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { trotelCoinLearningAddress } from "@/data/addresses";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";
import CountUp from "react-countup";

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

  useEffect(() => {
    const fetchRemainingRewards = async () => {
      const response = await fetch("/api/database/remainingRewards");
      const remainingRewards = await response?.json();
      setRemainingRewards(remainingRewards);
    };

    fetchRemainingRewards();
  }, []);

  useEffect(() => {
    const fetchTrotelCoinsPending = async () => {
      const response = await fetch("/api/database/trotelCoinsPending");
      const trotelCoinsPending = await response?.json();
      setTrotelCoinsPending(trotelCoinsPending);
    };

    fetchTrotelCoinsPending();
  }, []);

  useEffect(() => {
    const fetchNumberOfQuizzesAnswered = async () => {
      const response = await fetch(
        "/api/database/totalNumberOfQuizzesAnswered"
      );
      const numberOfQuizzesAnswered = await response?.json();
      setNumberOfQuizzesAnswered(numberOfQuizzesAnswered);
    };

    fetchNumberOfQuizzesAnswered();
  }, []);

  useEffect(() => {
    // finding number of learners by taking max id in the table "learners"

    const fetchNumberOfLearners = async () => {
      const response = await fetch("/api/database/numberOfLearners");
      const numberOfLearners = await response?.json();
      setNumberOfLearners(numberOfLearners);
    };

    fetchNumberOfLearners();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl mt-20">
          {typeof dict?.algorithm !== "string" && <>{dict?.algorithm.title}</>}
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-4xl">
              {trotelCoinsDistributed ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(trotelCoinsDistributed)}
                    duration={2}
                  />{" "}
                  💸
                </>
              ) : (
                <span className="animate-pulse">0 💸</span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.trotelCoinsDistributed}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-4xl">
              {trotelCoinsPending ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(trotelCoinsPending)}
                    duration={2}
                  />{" "}
                  💰
                </>
              ) : (
                <span className="animate-pulse">0 💰</span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.trotelCoinsPending}</>
              )}
            </span>
          </div>

          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-4xl">
              {numberOfLearners ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(numberOfLearners)}
                    duration={2}
                  />{" "}
                  👨‍💻
                </>
              ) : (
                <span className="animate-pulse">0 👨‍💻</span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.learners}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-4xl">
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
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-4xl">
              {remainingRewards ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(remainingRewards)}
                    duration={2}
                  />{" "}
                  ⏳
                </>
              ) : (
                <span className="animate-pulse">0 ⏳</span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.remainingCycle}</>
              )}
            </span>
          </div>
          <div
            className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
          >
            <span className="font-semibold text-4xl">
              {numberOfQuizzesAnswered ? (
                <>
                  <CountUp
                    start={0}
                    end={Math.floor(numberOfQuizzesAnswered)}
                    duration={2}
                  />{" "}
                  📚
                </>
              ) : (
                <span className="animate-pulse">0 📚</span>
              )}
            </span>

            <span>
              {typeof dict?.algorithm !== "string" && (
                <>{dict?.algorithm.numberOfQuizzesAnswered}</>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const Learn = ({ params: { lang } }: { params: { lang: Lang } }) => {
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
      <div className="max-w-4xl mx-auto">
        <TheAlgorithmSection
          dict={dict}
          trotelCoinsDistributed={parseFloat(
            (parseFloat(trotelCoinsDistributed as string) / 1e18).toFixed(0)
          )}
        />
        <div>
          <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl mt-10">
            {lang === "en" ? <>The future</> : <>Le futur</>}
          </h2>
          <ComingSoon lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Learn;
