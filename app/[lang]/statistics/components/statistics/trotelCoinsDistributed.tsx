"use client";

import { contracts } from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import React, { useEffect, useState, useContext } from "react";
import CountUp from "react-countup";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { useToken } from "wagmi";
import { updateEvolution } from "@/utils/statistics/updateEvolution";
import { updateStatistics } from "@/utils/statistics/updateStatistics";
import { StatisticsType } from "@/types/statistics/statistics";
import TrotelPriceContext from "@/contexts/trotelPrice";
import ChainContext from "@/contexts/chain";

const stat: StatisticsType = "distributed_trotelcoins";

const TrotelCoinsDistributed = ({
  lang,
  statsMap
}: {
  lang: Lang;
  statsMap: Map<StatisticsType, number>;
}) => {
  const [trotelCoinsDistributed, setTrotelCoinsDistributed] = useState<
    number | null
  >(null);
  const [evolution, setEvolution] = useState<number | null>(null);

  const { storedTrotelPrice, showTrotelInUsdc } =
    useContext(TrotelPriceContext);
  const { chain } = useContext(ChainContext);

  const { data } = useToken({
    chainId: chain.id,
    address: contracts[chain.id].trotelCoinAddress,
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
        className={`flex h-full flex-col items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <Evolution
          evolution={evolution as number}
          percentage={true}
          isLoading={!evolution}
        />
        <span className="text-2xl font-semibold md:text-4xl">
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
            showTrotelInUsdc && (
              <>
                <CountUp start={0} prefix="$" end={0} />{" "}
                <span className="hidden md:inline">💸</span>
              </>
            )
          )}
        </span>

        <span>{lang === "en" ? "Distributed" : "Distribués"}</span>
      </div>
    </>
  );
};

export default TrotelCoinsDistributed;
