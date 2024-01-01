"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/ui/interface/comingSoon";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { trotelCoinLearningAddress } from "@/data/addresses";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";

interface TheAlgorithmSectionProps {
  dict: DictType | null;
  remainingTokens: number;
  remainingTime: number;
}

const TheAlgorithmSection: React.FC<TheAlgorithmSectionProps> = ({
  dict,
  remainingTokens,
  remainingTime,
}) => {
  return (
    <>
      <h2 className="text-gray-900 dark:text-gray-100 text-xl mt-10">
        {typeof dict?.algorithm !== "string" && <>{dict?.algorithm.title}</>}
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
        <div
          className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <span className="font-semibold text-4xl">
            {remainingTokens ? (
              <>
                {remainingTokens / 10} {"< 🧠 <"} {remainingTokens / 4}
              </>
            ) : (
              <span className="animate-pulse">0</span>
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
            {remainingTime ? (
              <>{remainingTime} ⏳</>
            ) : (
              <span className="animate-pulse">0</span>
            )}
          </span>

          <span>
            {typeof dict?.algorithm !== "string" && (
              <>{dict?.algorithm.cycle}</>
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

  return (
    <>
      <TheAlgorithmSection
        dict={dict}
        remainingTokens={parseFloat(
          (parseFloat(remainingTokens as string) / 1e18).toFixed(0)
        )}
        remainingTime={parseFloat(remainingTime as string)}
      />
      <h2 className="text-gray-900 dark:text-gray-100 text-xl mt-10">
        {lang === "en" ? <>The future</> : <>Le futur</>}
      </h2>
      <ComingSoon lang={lang} />
    </>
  );
};

export default Learn;
