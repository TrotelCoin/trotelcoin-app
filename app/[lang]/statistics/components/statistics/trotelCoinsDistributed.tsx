"use client";

import { trotelCoinAddress } from "@/data/web3/addresses";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { polygon } from "viem/chains";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { useToken } from "wagmi";
import { updateEvolution } from "@/lib/statistics/evolutionPercentage";

const TrotelCoinsDistributed = ({ lang }: { lang: Lang }) => {
  const [trotelCoinsDistributed, setTrotelCoinsDistributed] = useState<
    number | null
  >(null);
  const [evolution, setEvolution] = useState<number | null>(null);

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

  useEffect(() => {
    updateEvolution(
      trotelCoinsDistributed as number,
      "trotelCoinsDistributed",
      setEvolution
    );
  }, [trotelCoinsDistributed]);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution evolution={evolution as number} />
        <span className="font-semibold text-2xl md:text-4xl">
          {trotelCoinsDistributed ? (
            <>
              <CountUp start={0} end={Math.floor(trotelCoinsDistributed)} />{" "}
              <span className="hidden md:inline">💸</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
              0 <span className="hidden md:inline">💸</span>
            </span>
          )}
        </span>

        <span>
          {lang === "en" ? "distributed TrotelCoins" : "TrotelCoins distribués"}
        </span>
      </div>
    </>
  );
};

export default TrotelCoinsDistributed;
