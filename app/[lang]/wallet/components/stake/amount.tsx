import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import type { Address } from "viem";
import { polygon } from "viem/chains";
import { useBalance, useBlockNumber } from "wagmi";

const Amount = ({
  lang,
  amount,
  setAmount,
  address,
}: {
  lang: Lang;
  amount: number;
  setAmount: (amount: number) => void;
  address: Address;
}) => {
  const [isMax, setIsMax] = useState<boolean>(false);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: balance, refetch } = useBalance({
    chainId: polygon.id,
    token: trotelCoinAddress,
    address: address,
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  useEffect(() => {
    if (amount && address) {
      const max = Number(balance?.formatted) * 0.999999;

      if (amount === max) {
        setIsMax(true);
      } else {
        setIsMax(false);
      }
    } else {
      setIsMax(false);
    }
  }, [amount, balance, address]);

  const setMax = () => {
    const max = Number(balance?.formatted) * 0.999999;
    setAmount(max);
  };

  return (
    <>
      <div className="flex items-end gap-2">
        <input
          type="number"
          className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full px-2 py-0 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent ${
            !address && "cursor-not-allowed"
          }`}
          value={amount < 0 ? 0 : amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          placeholder={lang === "en" ? "Amount" : "Montant"}
          disabled={!address}
        />

        <span className="font-semibold text-gray-900 dark:text-gray-100">
          TROTEL
        </span>
        {!isMax && Number(balance?.formatted) > 0 && (
          <button
            onClick={() => setMax()}
            className="text-sm text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
          >
            {lang === "en" ? "Max" : "Max"}
          </button>
        )}
      </div>
    </>
  );
};

export default Amount;
