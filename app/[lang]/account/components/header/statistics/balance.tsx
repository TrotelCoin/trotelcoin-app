import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import React, { useEffect, useContext } from "react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import CountUp from "react-countup";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { roundPrice } from "@/utils/price/roundPrice";

const Balance = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { showTrotelInUsdc, storedTrotelPrice } =
    useContext(TrotelPriceContext);

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
        className={`bg-white h-full flex items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {balance && !showTrotelInUsdc && (
                  <span>
                    <CountUp
                      start={0}
                      end={roundPrice(Number(balance?.formatted ?? "0"))}
                      suffix=" 💸"
                    />
                  </span>
                )}
                {balance && showTrotelInUsdc && (
                  <span>
                    <CountUp
                      prefix="$"
                      start={0}
                      end={roundPrice(
                        Number(balance?.formatted ?? "0") *
                          Number(storedTrotelPrice ?? "0")
                      )}
                      suffix=" 💸"
                    />
                  </span>
                )}
              </span>
            </>
          </span>
          <span className="flex items-center justify-center gap-1">
            {lang === "en" ? "Balance" : "Solde"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Balance;
