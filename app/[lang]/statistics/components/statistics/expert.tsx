import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import { trotelCoinExpertAddress } from "@/data/web3/addresses";
import { DictType, Lang } from "@/types/types";
import React from "react";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";

const Expert = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "totalSupply",
    watch: true,
  });

  return (
    <>
      <div
        className={`bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {expert ? (
            <>
              {parseFloat(expert.toString())}{" "}
              <span className="hidden md:inline">🦊</span>
            </>
          ) : (
            <span className="animate__animated animate__flash animate__slower animate__infinite">
              0 <span className="hidden md:inline">🦊</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Expert" : "Expert"}</span>
      </div>
    </>
  );
};

export default Expert;
