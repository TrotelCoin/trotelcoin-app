import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import { trotelCoinExpertAddress } from "@/data/web3/addresses";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import type { Lang } from "@/types/lang";
import React, { useEffect } from "react";
import { polygon } from "viem/chains";
import { useReadContract, useBlockNumber } from "wagmi";

const Expert = ({ lang }: { lang: Lang }) => {
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: expert, refetch } = useReadContract({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "totalSupply",
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  return (
    <>
      <div
        className={`bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {expert ? (
            <>
              {parseFloat(expert.toString())}{" "}
              <span className="hidden md:inline">🦊</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
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
