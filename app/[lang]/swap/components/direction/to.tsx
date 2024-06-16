import type { Lang } from "@/types/language/lang";
import React from "react";
import "animate.css";
import { Skeleton } from "@radix-ui/themes";
import { Token } from "@/types/web3/token";
import { TokenSource } from "@/types/web3/swap";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { Chain } from "@/types/web3/chain";
import type { ChainSource } from "@/types/web3/swap";
import Image from "next/image";

const To = ({
  lang,
  toBalance,
  toAmount,
  toToken,
  toPrice,
  isLoading,
  toChain,
  fromPrice,
  setOpenTokenList,
  setTokenList,
  setOpenChainList,
  setChainList,
}: {
  lang: Lang;
  toBalance: number;
  toAmount: number;
  toToken: Token;
  toPrice: number;
  isLoading: boolean;
  toChain: Chain;
  fromPrice: number;
  setOpenTokenList: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenList: React.Dispatch<React.SetStateAction<TokenSource>>;
  setOpenChainList: React.Dispatch<React.SetStateAction<boolean>>;
  setChainList: React.Dispatch<React.SetStateAction<ChainSource>>;
}) => {
  return (
    <>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {lang === "en" ? "You receive" : "Vous recevez"}
            </span>
            <button
              onClick={() => {
                setChainList("to");
                setOpenChainList(true);
              }}
              className="flex items-center gap-1"
            >
              {toChain.icon && (
                <>
                  <Image
                    width={16}
                    height={16}
                    alt="Chain logo"
                    src={toChain.icon}
                    className="rounded-full"
                  />
                </>
              )}
              <div className="flex items-center">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {toChain.name}
                </span>
                <ChevronDownIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </div>
            </button>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            <Skeleton loading={isLoading}>
              {lang === "en" ? "Balance:" : "Solde:"}{" "}
              <span>
                {toBalance
                  ? Number(toBalance?.toFixed(3)).toLocaleString("en-US")
                  : "0"}
              </span>{" "}
            </Skeleton>
          </span>
        </div>
        <div className="flex items-end gap-4">
          <Skeleton loading={isLoading}>
            <input
              type="number"
              className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full h-full px-2 py-0 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent cursor-not-allowed`}
              onWheel={(e) => e.preventDefault()}
              value={
                toAmount
                  ? toAmount >= 1
                    ? Number((toAmount * 10 ** -toToken.decimals).toFixed(2))
                    : Number((toAmount * 10 ** -toToken.decimals).toFixed(5))
                  : 0
              }
              disabled={true}
            />
          </Skeleton>

          <div className="flex flex-col justify-center items-end">
            <button
              onClick={() => {
                setTokenList("to");
                setOpenTokenList(true);
              }}
              className="flex items-center"
            >
              <div className="flex items-center justify-end gap-1">
                {toToken.logoURI && toToken.name === "TrotelCoin" ? (
                  <>
                    <div className="block dark:hidden w-4 h-4">
                      <Image
                        width={16}
                        height={16}
                        className="rounded-full"
                        aria-hidden="true"
                        alt="Token logo"
                        src={toToken.lightLogoURI as string}
                      />
                    </div>
                    <div className="hidden dark:block w-4 h-4">
                      <Image
                        width={16}
                        height={16}
                        className="rounded-full"
                        aria-hidden="true"
                        alt="Token logo"
                        src={toToken.darkLogoURI as string}
                      />
                    </div>
                  </>
                ) : (
                  <Image
                    width={16}
                    height={16}
                    className="rounded-full"
                    aria-hidden="true"
                    alt="Token logo"
                    src={toToken.logoURI}
                  />
                )}
                <div className="flex items-center justify-end">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {toToken.symbol}
                  </span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
            </button>

            <div className="flex items-center gap-1">
              <span className={`text-xs`}>
                <Skeleton loading={isLoading}>
                  $
                  {toPrice
                    ? Number(toPrice.toFixed(2)).toLocaleString("en-US")
                    : "0"}
                </Skeleton>
              </span>
              {
                <span className={`text-xs`}>
                  <Skeleton loading={isLoading}>
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
                  </Skeleton>
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
