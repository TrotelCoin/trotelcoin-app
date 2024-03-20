import React from "react";
import { tokenAddressToName } from "@/lib/tokenAddressToName";
import { Lang } from "@/types/types";
import { Address } from "viem";

const From = ({
  lang,
  fromBalance,
  fromAmount,
  setFromAmount,
  fromTokenAddress,
  fromPrice,
}: {
  lang: Lang;
  fromBalance: number;
  fromAmount: number;
  setFromAmount: React.Dispatch<React.SetStateAction<number>>;
  fromTokenAddress: Address;
  fromPrice: number;
}) => {
  return (
    <>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {lang === "en" ? "You pay" : "Vous payez"}
            </span>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {lang === "en" ? "Balance:" : "Solde:"}{" "}
            {fromBalance
              ? Number(fromBalance?.toFixed(2)).toLocaleString("en-US")
              : "0"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent"
            value={fromAmount < 0 ? 0 : fromAmount}
            onChange={(e) => setFromAmount(parseFloat(e.target.value))}
            placeholder={lang === "en" ? "Amount" : "Montant"}
          />
          <div className="flex flex-col justify-center items-end">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {tokenAddressToName(fromTokenAddress)}
            </span>
            <span className="text-xs">
              $
              {fromPrice
                ? Number(fromPrice?.toFixed(2)).toLocaleString("en-US")
                : "0"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default From;
