import trotelCoinEarlyABI from "@/abi/trotelCoinEarly";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
  trotelCoinEarlyAddress,
} from "@/data/web3/addresses";
import { DictType } from "@/types/types";
import React from "react";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";

const PremiumStatistics = ({ dict }: { dict: DictType }) => {
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
      <div className="overflow-hidden grid grid-cols-1 md:grid-cols-3 mt-4 text-gray-900 dark:text-gray-100 items-center text-center md:divide-x md:divide-y-0 divide-x-0 divide-y divide-gray-900/20 dark:divide-gray-100/20 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-900/20 dark:border-gray-100/20 blackdrop-blur-xl">
        <div className="items-center flex flex-col py-6">
          <span className="text-2xl md:text-4xl font-semibold">
            {parseFloat(early as string).toLocaleString("en-US")}
          </span>
          <span>
            {typeof dict?.premium !== "string" && <>{dict?.premium.early}</>}
          </span>
        </div>
        <div className="items-center flex flex-col py-6">
          <span className="text-2xl md:text-4xl font-semibold">
            {parseFloat(intermediate as string).toLocaleString("en-US")}
          </span>
          <span>
            {typeof dict?.premium !== "string" && (
              <>{dict?.premium.intermediate}</>
            )}
          </span>
        </div>
        <div className="items-center flex flex-col py-6">
          <span className="text-2xl md:text-4xl font-semibold">
            {parseFloat(expert as string).toLocaleString("en-US")}
          </span>
          <span>
            {typeof dict?.premium !== "string" && <>{dict?.premium.expert}</>}
          </span>
        </div>
      </div>
    </>
  );
};

export default PremiumStatistics;
