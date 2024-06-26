import { getContractAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/language/lang";
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import React, { useEffect, useContext } from "react";
import { Address, formatEther } from "viem";
import CountUp from "react-countup";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { roundPrice } from "@/utils/price/roundPrice";
import ChainContext from "@/contexts/chain";

const Balance = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { showTrotelInUsdc, storedTrotelPrice } =
    useContext(TrotelPriceContext);
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { data: balance, refetch } = useBalance({
    chainId: chain.id,
    token: getContractAddress(chain.id, "trotelCoinAddress"),
    address: address as Address
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, address, refetch]);

  return (
    <>
      <div
        className={`flex h-full items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <div className="mx-auto flex flex-col text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {!showTrotelInUsdc && (
                  <span>
                    <CountUp
                      start={0}
                      end={roundPrice(
                        Number(
                          formatEther(balance ? balance?.value : BigInt(0))
                        )
                      )}
                      suffix=" 💸"
                    />
                  </span>
                )}
                {showTrotelInUsdc && (
                  <span>
                    <CountUp
                      prefix="$"
                      start={0}
                      end={roundPrice(
                        Number(
                          formatEther(balance ? balance?.value : BigInt(0))
                        ) * (storedTrotelPrice as number)
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
