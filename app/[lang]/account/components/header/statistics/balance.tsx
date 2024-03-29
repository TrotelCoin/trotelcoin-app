import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/lang";
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import React, { useEffect } from "react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import CountUp from "react-countup";

const Balance = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: balance, refetch } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    address: address as Address,
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, address]);

  return (
    <>
      <div
        className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {balance ? (
                  <span>
                    <CountUp
                      start={0}
                      end={Math.floor(Number(balance.formatted))}
                    />
                  </span>
                ) : (
                  <span className={`${loadingFlashClass}`}>0</span>
                )}
              </span>
            </>
          </span>
          <span>{lang === "en" ? "Balance" : "Solde"}</span>
        </div>
      </div>
    </>
  );
};

export default Balance;
