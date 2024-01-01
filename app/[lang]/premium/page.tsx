"use client";

import React, { useEffect, useState } from "react";
import Intermediate from "@/app/[lang]/ui/premium/intermediate";
import Expert from "@/app/[lang]/ui/premium/expert";
import { useContractRead } from "wagmi";
import { polygon } from "wagmi/chains";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";
import CountUp from "react-countup";
import {
  trotelCoinEarlyAddress,
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/addresses";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

const Subscription = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    functionName: "totalSupply",
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "totalSupply",
    watch: true,
  });
  const { data: early } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinEarlyAddress,
    abi: trotelCoinEarlyABI,
    functionName: "totalSupply",
    watch: true,
  });

  return (
    <>
      <div className="flex flex-col my-20 max-w-4xl mx-auto">
        <h1 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
          {typeof dict?.premium !== "string" && <>{dict?.premium.claimNFTs}</>}
        </h1>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
          <Intermediate lang={lang} />
          <Expert lang={lang} />
        </div>
        <h1 className="text-xl mt-10 text-gray-900 dark:text-gray-100 font-semibold">
          {typeof dict?.premium !== "string" && <>{dict?.premium.statistics}</>}
        </h1>
        <div className="overflow-hidden grid grid-cols-1 mt-4 text-gray-900 dark:text-gray-100 items-center text-center divide-y divide-black/10 dark:divide-white/10 rounded-lg bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 blackdrop-blur-xl">
          <div className="items-center flex flex-col py-6 md:col-span-2">
            <span className="text-6xl font-semibold">
              <CountUp
                start={0}
                end={parseFloat(early as string)}
                duration={5}
              />
            </span>
            <span>
              {typeof dict?.premium !== "string" && <>{dict?.premium.early}</>}
            </span>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10">
            <div className="items-center flex flex-col py-6">
              <span className="text-6xl font-semibold">
                <CountUp
                  start={0}
                  end={parseFloat(intermediate as string)}
                  duration={5}
                />
              </span>
              <span>
                {typeof dict?.premium !== "string" && (
                  <>{dict?.premium.intermediate} 🙈</>
                )}
              </span>
            </div>
            <div className="items-center flex flex-col py-6">
              <span className="text-6xl font-semibold">
                <CountUp
                  start={0}
                  end={parseFloat(expert as string)}
                  duration={5}
                />
              </span>
              <span>
                {typeof dict?.premium !== "string" && (
                  <>{dict?.premium.expert} 🦊</>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
