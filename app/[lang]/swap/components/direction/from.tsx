import React, { useEffect, useState } from "react";
import type { Lang } from "@/types/language/lang";
import { type Address } from "viem";
import { Skeleton } from "@radix-ui/themes";
import { Token } from "@/types/web3/token";
import { TokenSource } from "@/types/web3/swap";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { ExtendedChain } from "@/types/web3/chain";
import type { ChainSource } from "@/types/web3/swap";
import Image from "next/image";
import { roundPrice } from "@/utils/price/roundPrice";
import maxParameter from "@/data/web3/maxParameter";

const From = ({
  lang,
  fromBalance,
  fromAmount,
  setFromAmount,
  fromToken,
  fromPrice,
  isLoading,
  fromChain,
  userAddress,
  setOpenTokenList,
  setTokenList,
  setOpenChainList,
  setChainList
}: {
  lang: Lang;
  fromBalance: number;
  fromAmount: number | undefined;
  setFromAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  fromToken: Token;
  fromPrice: number;
  isLoading: boolean;
  fromChain: ExtendedChain;
  userAddress: Address;
  setOpenTokenList: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenList: React.Dispatch<React.SetStateAction<TokenSource>>;
  setOpenChainList: React.Dispatch<React.SetStateAction<boolean>>;
  setChainList: React.Dispatch<React.SetStateAction<ChainSource>>;
}) => {
  const [isMax, setIsMax] = useState<boolean>(false);

  const setMax = () => {
    if (fromBalance && fromToken) {
      const max = fromBalance;

      setFromAmount(Number(max));
    }
  };

  useEffect(() => {
    if (fromBalance && fromToken) {
      const max = fromBalance * maxParameter;

      if (fromAmount === max) {
        setIsMax(true);
      } else {
        setIsMax(false);
      }
    }
  }, [fromAmount, fromBalance, fromToken]);

  return (
    <>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col items-start justify-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {lang === "en" ? "You pay" : "Vous payez"}
              </span>
              <button
                onClick={() => {
                  setChainList("from");
                  setOpenChainList(true);
                }}
                className="flex items-center gap-1"
              >
                {fromChain.icon && (
                  <>
                    <Image
                      width={16}
                      height={16}
                      alt="Chain logo"
                      src={fromChain.icon}
                      className="rounded-full"
                    />
                  </>
                )}
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {fromChain.name}
                  </span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </div>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Skeleton loading={isLoading}>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {lang === "en" ? "Balance:" : "Solde:"}{" "}
                <span>
                  {fromBalance
                    ? fromBalance > 1
                      ? roundPrice(fromBalance).toLocaleString("en-US")
                      : roundPrice(fromBalance)
                    : "0"}
                </span>{" "}
              </span>
            </Skeleton>
            {!isMax && fromBalance > 0 && (
              <button
                onClick={() => setMax()}
                className="cursor-pointer text-sm text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400"
              >
                {lang === "en" ? "Max" : "Max"}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="number"
            className={`w-full rounded-xl border-transparent bg-transparent px-2 py-0 text-4xl font-semibold text-gray-900 [appearance:textfield] focus:border-transparent focus:outline-none focus:ring-transparent dark:text-gray-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
              !userAddress && "cursor-not-allowed"
            }`}
            value={fromAmount && fromAmount < 0 ? 0 : fromAmount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setFromAmount(undefined);
              } else {
                const numberValue = Number(value);
                if (!isNaN(numberValue)) {
                  setFromAmount(numberValue);
                }
              }
            }}
            placeholder={lang === "en" ? "Amount" : "Montant"}
            disabled={!userAddress}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
          <div className="flex flex-col items-end justify-center">
            <button
              onClick={() => {
                setTokenList("from");
                setOpenTokenList(true);
              }}
            >
              <div className="flex items-center justify-end gap-1">
                {fromToken.logoURI && fromToken.name === "TrotelCoin" ? (
                  <>
                    <div className="block h-4 w-4 dark:hidden">
                      <Image
                        width={16}
                        height={16}
                        className="rounded-full"
                        aria-hidden="true"
                        alt="Token logo"
                        src={fromToken.lightLogoURI as string}
                      />
                    </div>
                    <div className="hidden h-4 w-4 dark:block">
                      <Image
                        width={16}
                        height={16}
                        className="rounded-full"
                        aria-hidden="true"
                        alt="Token logo"
                        src={fromToken.darkLogoURI as string}
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
                    src={fromToken.logoURI}
                  />
                )}
                <div className="flex items-center justify-end">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {fromToken.symbol}
                  </span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
            </button>

            <Skeleton loading={isLoading}>
              <span className={`text-xs`}>
                $
                {fromPrice
                  ? fromPrice > 1
                    ? roundPrice(Number(fromPrice)).toLocaleString("en-US")
                    : roundPrice(Number(fromPrice))
                  : "0"}
              </span>
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default From;
