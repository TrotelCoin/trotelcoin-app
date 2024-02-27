"use client";

import { trotelCoinAddress } from "@/data/web3/addresses";
import { DictType } from "@/types/types";
import React, { useEffect, useState } from "react";
import { polygon } from "viem/chains";
import { useToken } from "wagmi";

const TrotelCoinsDistributed = ({ dict }: { dict: DictType }) => {
  const [trotelCoinsDistributed, setTrotelCoinsDistributed] = useState<
    number | null
  >(null);

  const { data } = useToken({
    chainId: polygon.id,

    address: trotelCoinAddress,
  });

  useEffect(() => {
    if (data) {
      const totalSupply = parseFloat(data.totalSupply.formatted);
      const initialSupply = 100000000;

      setTrotelCoinsDistributed(totalSupply - initialSupply);
    }
  }, [data]);

  return (
    <>
      <div
        className={`bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {trotelCoinsDistributed ? (
            <>
              {Math.floor(trotelCoinsDistributed).toLocaleString("en-US")}{" "}
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
