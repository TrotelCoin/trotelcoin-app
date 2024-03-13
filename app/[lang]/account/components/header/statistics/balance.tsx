import { trotelCoinAddress } from "@/data/web3/addresses";
import { Lang } from "@/types/types";
import { useAccount } from "wagmi";
import React from "react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { useBalance } from "wagmi";

const Balance = ({ lang }: { lang: Lang }) => {
  const { address}  = useAccount();

  const { data: balance } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    enabled: Boolean(address),
    address: address as Address,
  });

  return (
    <>
      <div
        className={`bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {balance ? (
                  <span>
                    {Math.floor(parseFloat(balance.formatted)).toLocaleString(
                      "en-US"
                    )}
                  </span>
                ) : (
                  <span className="animate__animated animate__flash animate__slower animate__infinite">
                    0
                  </span>
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
