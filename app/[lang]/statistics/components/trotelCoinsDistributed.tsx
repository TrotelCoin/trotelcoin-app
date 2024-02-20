import trotelCoinLearningABI from "@/abi/trotelCoinLearning";
import { trotelCoinLearningAddress } from "@/data/web3/addresses";
import { DictType } from "@/types/types";
import React from "react";
import { polygon } from "viem/chains";
import { useContractRead } from "wagmi";

const TrotelCoinsDistributed = ({ dict }: { dict: DictType }) => {
  const { data: trotelCoinsDistributed } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinLearningABI,
    address: trotelCoinLearningAddress,
    functionName: "totalRewards",
    watch: true,
  });

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {trotelCoinsDistributed ? (
            <>
              {Math.floor(
                parseFloat(
                  (parseFloat(trotelCoinsDistributed as string) / 1e18).toFixed(
                    0
                  )
                )
              )}{" "}
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
    </>
  );
};

export default TrotelCoinsDistributed;
