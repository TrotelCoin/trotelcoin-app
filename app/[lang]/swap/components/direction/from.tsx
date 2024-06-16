import React, { useEffect, useState } from "react";
import type { Lang } from "@/types/language/lang";
import { type Address } from "viem";
import { Skeleton } from "@radix-ui/themes";
import { Token } from "@/types/web3/token";
import { TokenSource } from "@/types/web3/swap";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { Chain } from "@/types/web3/chain";
import type { ChainSource } from "@/types/web3/swap";
import Image from "next/image";

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
  setChainList,
}: {
  lang: Lang;
  fromBalance: number;
  fromAmount: number;
  setFromAmount: React.Dispatch<React.SetStateAction<number>>;
  fromToken: Token;
  fromPrice: number;
  isLoading: boolean;
  fromChain: Chain;
  userAddress: Address;
  setOpenTokenList: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenList: React.Dispatch<React.SetStateAction<TokenSource>>;
  setOpenChainList: React.Dispatch<React.SetStateAction<boolean>>;
  setChainList: React.Dispatch<React.SetStateAction<ChainSource>>;
}) => {
  const [isMax, setIsMax] = useState<boolean>(false);

  const setMax = () => {
    if (fromBalance && fromToken) {
      const max = fromBalance * 0.999999;

      setFromAmount(Number(max));
    }
  };

  useEffect(() => {
    if (fromBalance && fromToken) {
      const max = fromBalance * 0.999999;

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
              <span className="text-gray-700 dark:text-gray-300 text-sm">
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
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <Skeleton loading={isLoading}>
                {lang === "en" ? "Balance:" : "Solde:"}{" "}
                <span>
                  {fromBalance
                    ? Number(fromBalance?.toFixed(3)).toLocaleString("en-US")
                    : "0"}
                </span>{" "}
              </Skeleton>
            </span>
            {!isMax && fromBalance > 0 && (
              <button
                onClick={() => setMax()}
                className="text-sm text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
              >
                {lang === "en" ? "Max" : "Max"}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="number"
            className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full px-2 py-0 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent ${
              !userAddress && "cursor-not-allowed"
            }`}
            value={fromAmount < 0 ? 0 : fromAmount}
            onChange={(e) => setFromAmount(Number(e.target.value))}
            placeholder={lang === "en" ? "Amount" : "Montant"}
            disabled={!userAddress}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
          <div className="flex flex-col justify-center items-end">
            <button
              onClick={() => {
                setTokenList("from");
                setOpenTokenList(true);
              }}
            >
              <div className="flex items-center justify-end gap-1">
                {fromToken.logoURI && fromToken.name === "TrotelCoin" ? (
                  <>
                    <div className="block dark:hidden w-4 h-4">
                      <Image
                        width={16}
                        height={16}
                        className="rounded-full"
                        aria-hidden="true"
                        alt="Token logo"
                        src={fromToken.lightLogoURI as string}
                      />
                    </div>
                    <div className="hidden dark:block w-4 h-4">
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

            <span className={`text-xs`}>
              <Skeleton loading={isLoading}>
                $
                {fromPrice
                  ? Number(fromPrice.toFixed(2)).toLocaleString("en-US")
                  : "0"}
              </Skeleton>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default From;
