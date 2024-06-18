"use client";

import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState, useContext } from "react";
import CountUp from "react-countup";
import { polygon } from "viem/chains";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { useToken } from "wagmi";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import { StatisticsType } from "@/types/statistics/statistics";
import TrotelPriceContext from "@/contexts/trotelPrice";

const stat: StatisticsType = "distributed_trotelcoins";

const TrotelCoinsDistributed = ({
  lang,
  statsMap,
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [trotelCoinsDistributed, setTrotelCoinsDistributed] = useState<
    number | null
  >(null);
  const [evolution, setEvolution] = useState<number | null>(null);

  const { storedTrotelPrice, showTrotelInUsdc } = useContext(TrotelPriceContext);

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
    if (statsMap instanceof Map && statsMap.has(stat)) {
      updateStatistics(stat, trotelCoinsDistributed as number);
      updateEvolution(
        trotelCoinsDistributed as number,
        setEvolution,
        statsMap.get(stat) as number,
        true
      );
    }
  }, [trotelCoinsDistributed, statsMap]);

  return (
    <>
      <div
        className={`bg-white flex flex-col h-full items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution
          evolution={evolution as number}
          percentage={true}
          isLoading={!evolution}
        />
        <span className="font-semibold text-2xl md:text-4xl">
          {trotelCoinsDistributed && !showTrotelInUsdc && (
            <>
              <CountUp start={0} end={trotelCoinsDistributed} />{" "}
              <span className="hidden md:inline">💸</span>
            </>
          )}

          {trotelCoinsDistributed && showTrotelInUsdc && storedTrotelPrice ? (
            <>
              <CountUp
                start={0}
                prefix="$"
                end={storedTrotelPrice * trotelCoinsDistributed}
              />{" "}
              <span className="hidden md:inline">💸</span>
            </>
          ) : (
            <>
              <CountUp start={0} prefix="$" end={0} />{" "}
              <span className="hidden md:inline">💸</span>
            </>
          )}
        </span>

        <span>{lang === "en" ? "Distributed" : "Distribués"}</span>
      </div>
    </>
  );
};

export default TrotelCoinsDistributed;
