import { trotelCoinAddress } from "@/data/web3/addresses";
import { DictType } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import { Address } from "viem";
import { polygon } from "viem/chains";
import { useBalance } from "wagmi";

const Balance = ({ dict }: { dict: DictType }) => {
  const address = useAddress();

  const { data: balance } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    enabled: Boolean(address),
    address: address as Address,
  });

  return (
    <>
      <div
        className={`bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
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
          <span>
            {typeof dict?.account !== "string" && <>{dict?.account.balance}</>}
          </span>
        </div>
      </div>
    </>
  );
};

export default Balance;
