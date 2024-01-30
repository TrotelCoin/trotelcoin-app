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
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchRemainingRewards = async () => {
      const response = await fetch("/api/database/remainingRewards");
      const remainingRewards = await response.json();
      console.log(remainingRewards);
      setRemainingRewards(remainingRewards);
    };

    fetchRemainingRewards();
  }, []);

  useEffect(() => {
    // finding number of learners by taking max id in the table "learners"

    const fetchNumberOfLearners = async () => {
      const response = await fetch("/api/database/numberOfLearners");
      const numberOfLearners = await response.json();
      setNumberOfLearners(numberOfLearners);
    };

    fetchNumberOfLearners();
  }, []);

  useEffect(() => {
    if (remainingRewards !== null && numberOfLearners !== null) {
      setIsDataFetched(true);
    }
  }, [remainingRewards, numberOfLearners]);

  return (
    <>
      <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl mt-20">
        {typeof dict?.algorithm !== "string" && <>{dict?.algorithm.title}</>}
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
        <div
          className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <span className="font-semibold text-4xl">
            {trotelCoinsDistributed && isDataFetched ? (
              <>
                <CountUp
                  start={0}
                  end={Math.floor(trotelCoinsDistributed)}
                  duration={1}
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
            {remainingRewards && isDataFetched ? (
              <>
                <CountUp
                  start={0}
                  end={Math.floor(remainingRewards / 10)}
                  duration={1}
                />{" "}
                {"< 🧠 <"}
                <CountUp
                  start={0}
                  end={Math.floor(remainingRewards / 4)}
                  duration={1}
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
            {numberOfLearners && isDataFetched ? (
              <>
                <CountUp
                  start={0}
                  end={Math.floor(numberOfLearners)}
                  duration={1}
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
          remainingTokens={parseFloat(
            (parseFloat(remainingTokens as string) / 1e18).toFixed(0)
          )}
          remainingTime={parseFloat(remainingTime as string)}
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
        <div className="mb-20">
          <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl mt-10">
            {typeof dict?.learn !== "string" && (
              <>{dict?.learn.trainingCenter}</>
            )}
          </h2>
          <ComingSoon lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Learn;
