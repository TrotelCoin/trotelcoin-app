"use client";

import React from "react";
import Intermediate from "@/app/ui/premium/intermediate";
import Expert from "@/app/ui/premium/expert";
import { useContractRead, Address } from "wagmi";
import { polygon } from "wagmi/chains";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import CountUp from "react-countup";

const trotelCoinIntermediateAddress: Address =
  "0xC637150711632dEB7313A3E87bE66D772BC9BA8C";
const trotelCoinExpertAddress: Address =
  "0xc40B8aF9E501ef716b9caa284Ea26a919Ab43863";

const Subscription = () => {
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

  return (
    <>
      <div className="flex flex-col my-20 max-w-4xl mx-auto">
        <h1 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
          Claim your NFTs
        </h1>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
          <Intermediate />
          <Expert />
        </div>
        <h1 className="text-xl mt-4 text-gray-900 dark:text-gray-100 font-semibold">
          Statistics
        </h1>
        <div className="overflow-hidden mt-4 text-gray-900 dark:text-gray-100 font-semibold items-center text-center divide-y divide-black/10 dark:divide-white/10 rounded-lg bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 blackdrop-blur-xl">
          <div className="items-center py-6">
            <span className="text-6xl">
              <CountUp
                start={0}
                end={parseFloat(intermediate as string)}
                duration={5}
              />
            </span>{" "}
            <span className="rainbow-text text-2xl">Intermediate</span>
          </div>
          <div className="items-center py-6">
            <span className="text-6xl">
              <CountUp
                start={0}
                end={parseFloat(expert as string)}
                duration={5}
              />
            </span>{" "}
            <span className="rainbow-text text-2xl">Expert</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
