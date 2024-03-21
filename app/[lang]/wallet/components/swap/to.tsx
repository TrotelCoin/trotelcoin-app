import type { Lang } from "@/types/lang";
import React from "react";
import "animate.css";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import { Token } from "@/types/web3/token";
import { TokenSource } from "@/types/web3/swap";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const To = ({
  lang,
  toBalance,
  toAmount,
  toToken,
  toPrice,
  isLoading,
  toChainId,
  fromPrice,
  setOpenTokenList,
  setTokenList,
}: {
  lang: Lang;
  toBalance: number;
  toAmount: number;
  toToken: Token;
  toPrice: number;
  isLoading: boolean;
  toChainId: number;
  fromPrice: number;
  setOpenTokenList: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenList: React.Dispatch<React.SetStateAction<TokenSource>>;
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
            <span className={`${isLoading && loadingFlashClass}`}>
              {toBalance
                ? Number(toBalance?.toFixed(2)).toLocaleString("en-US")
                : "0"}
            </span>
          </span>
        </div>
        <div className="flex items-end gap-4">
          <input
            type="number"
            className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full px-2 py-0 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent cursor-not-allowed ${
              isLoading && loadingFlashClass
            }`}
            onWheel={(e) => e.preventDefault()}
            value={
              toAmount
                ? Number((toAmount * 10 ** -toToken.decimals).toFixed(2))
                : 0
            }
            disabled={true}
          />

          <div className="flex flex-col justify-center items-end">
            <button
              onClick={() => {
                setTokenList("to");
                setOpenTokenList(true);
              }}
              className="flex items-center"
            >
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {toToken.symbol}
              </span>
              <ChevronDownIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-1">
              <span className={`text-xs ${isLoading && loadingFlashClass}`}>
                $
                {toPrice && toAmount
                  ? Number(
                      (toPrice * (toAmount * 10 ** -toToken.decimals)).toFixed(
                        2
                      )
                    ).toLocaleString("en-US")
                  : "0"}
              </span>
              {
                <span className={`text-xs ${isLoading && loadingFlashClass}`}>
                  {(() => {
                    let percentage = 0;
                    if (
                      !fromPrice ||
                      !toPrice ||
                      fromPrice === 0 ||
                      toPrice === 0 ||
                      fromPrice === toPrice
                    ) {
                      return (
                        <span className={"text-gray-700 dark:text-gray-300"}>
                          ({percentage.toFixed(2)}%)
                        </span>
                      );
                    }

                    const difference = toPrice - fromPrice;
                    percentage = (difference / fromPrice) * 100;
                    const isPositive = percentage > 0;
                    const isZero = percentage === 0;
                    return (
                      <span
                        className={
                          isZero
                            ? "text-gray-700 dark:text-gray-300"
                            : isPositive
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        ({percentage.toFixed(2)}%)
                      </span>
                    );
                  })()}
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default To;
