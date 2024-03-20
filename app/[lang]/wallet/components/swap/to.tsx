import type { Lang } from "@/types/lang";
import React from "react";
import { Address } from "viem";
import { tokenAddressToName } from "@/lib/tokenAddressToName";
import "animate.css";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const To = ({
  lang,
  toBalance,
  toAmount,
  toTokenAddress,
  toPrice,
  isLoading,
  toChainId,
}: {
  lang: Lang;
  toBalance: number;
  toAmount: number;
  toTokenAddress: Address;
  toPrice: number;
  isLoading: boolean;
  toChainId: number;
}) => {
  return (
    <>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {lang === "en" ? "You receive" : "Vous recevez"}
            </span>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {lang === "en" ? "Balance:" : "Solde:"}{" "}
            {toBalance
              ? Number(toBalance?.toFixed(2)).toLocaleString("en-US")
              : "0"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="number"
            className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent cursor-not-allowed ${
              isLoading && loadingFlashClass
            }`}
            onWheel={(e) => e.preventDefault()}
            value={toAmount ? Number((toAmount * 1e-18).toFixed(2)) : 0}
            disabled={true}
          />
          <div className="flex flex-col justify-center items-end">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {tokenAddressToName(toTokenAddress, toChainId)}
            </span>
            <span className={`text-xs ${isLoading && loadingFlashClass}`}>
              $
              {toPrice
                ? Number(toPrice?.toFixed(2)).toLocaleString("en-US")
                : "0"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default To;
