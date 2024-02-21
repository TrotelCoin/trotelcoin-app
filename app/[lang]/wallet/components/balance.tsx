import { trotelCoinAddress } from "@/data/web3/addresses";
import { Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { polygon } from "viem/chains";
import { useBalance } from "wagmi";
import { Address } from "viem";

const Balance = ({ lang }: { lang: Lang }) => {
  const [balance, setBalance] = useState<number | null>(null);

  const address = useAddress();

  const { data } = useBalance({
    token: trotelCoinAddress,
    chainId: polygon.id,
    address: address as Address,
  });

  useEffect(() => {
    if (data) {
      setBalance(parseFloat(data.value.toString()));
    } else {
      setBalance(0);
    }
  }, [data]);

  return (
    <>
      <div className="flex justify-between">
        <div>
          <span className="text-4xl text-blue-500 dark:text-blue-300">
            {balance ?? 0}
            <span className="text-base text-gray-700 dark:text-gray-300">
              TROTEL
            </span>
          </span>
        </div>
        <div>{lang === "en" ? "balance" : "solde"}</div>
      </div>
    </>
  );
};

export default Balance;
