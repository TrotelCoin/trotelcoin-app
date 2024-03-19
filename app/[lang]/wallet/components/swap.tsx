"use client";

import React, { useEffect, useState } from "react";
import { Lang } from "@/types/types";
import { CogIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAccount } from "wagmi";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import Wallet from "@/app/[lang]/components/header/wallet";
import { polygon, mainnet } from "viem/chains";
import { Address } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";

export const maticAddress: Address =
  "0x0000000000000000000000000000000000001010";

export type Sort = "output" | "gas" | "time";

const Swap = ({ lang }: { lang: Lang }) => {
  const [fromChainId, setFromChainId] = useState<number>(polygon.id);
  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [fromAmount, setFromAmount] = useState<number | undefined>(undefined);
  const [fromTokenAddress, setFromTokenAddress] =
    useState<Address>(maticAddress);
  const [toChainId, setToChainId] = useState<number>(polygon.id);
  const [toPrice, setToPrice] = useState<number | null>(null);
  const [toTokenAddress, setToTokenAddress] =
    useState<Address>(trotelCoinAddress);
  const [uniqueRoutesPerBridge, setUniqueRoutesPerBridge] =
    useState<boolean>(true);
  const [sort, setSort] = useState<Sort>("output");
  const [singleTxOnly, setSingleTxOnly] = useState<boolean>(false);
  const [signer, setSigner] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [tokenList, setTokenList] = useState<any[]>([]);

  const { address: userAddress } = useAccount();

  const chainIdToName = (chainId: number) => {
    switch (chainId) {
      case mainnet.id:
        return "Ethereum";
      case polygon.id:
        return "Polygon";
      default:
        return "Unknown";
    }
  };

  const tokenAddressToName = (tokenAddress: Address) => {
    switch (tokenAddress) {
      case trotelCoinAddress:
        return "TROTEL";
      case maticAddress:
        return "MATIC";
      default:
        return "Unknown";
    }
  };

  const openSettings = () => {
    null;
  };

  return (
    <>
      <div className="mt-8 w-full flex flex-col flex-wrap gap-4 bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between px-4">
          <div>
            <span className="font-bold text-xl">
              {lang === "en" ? <>Swap</> : <>Échanger</>}
            </span>
            <div className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  userAddress ? "bg-green-500" : "bg-gray-500"
                }`}
              />
              {userAddress ? (
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {lang === "en" ? "Connected" : "Connecté"}
                </span>
              ) : (
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {lang === "en" ? "Not connected" : "Non connecté"}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Wallet lang={lang} />
            </div>
            <BlueSimpleButton onClick={() => openSettings()}>
              <CogIcon className="w-5 h-5 text-gray-100" />
            </BlueSimpleButton>
          </div>
        </div>

        <div className="px-4 pt-4">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {lang === "en" ? "From" : "De"}
                </span>
              </div>
              <span>
                $
                {fromPrice
                  ? Number(fromPrice?.toFixed(2)).toLocaleString("en-US")
                  : "0"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent"
                value={fromAmount as number}
                onChange={(e) => setFromAmount(parseFloat(e.target.value))}
                placeholder={lang === "en" ? "Amount" : "Montant"}
              />
              <div className="flex items-center">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {tokenAddressToName(fromTokenAddress)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {lang === "en" ? "To" : "Vers"}
                </span>
              </div>
              <span>
                $
                {toPrice
                  ? Number(toPrice?.toFixed(2)).toLocaleString("en-US")
                  : "0"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent cursor-not-allowed"
                onWheel={(e) => e.preventDefault()}
                placeholder={lang === "en" ? "0" : "0"}
                disabled={true}
              />
              <div className="flex items-center">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {tokenAddressToName(toTokenAddress)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 block md:hidden">
        <Wallet lang={lang} isFull={true} isCentered={true} />
      </div>
    </>
  );
};

export default Swap;
