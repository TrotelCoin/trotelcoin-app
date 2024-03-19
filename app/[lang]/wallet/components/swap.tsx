"use client";

import React, { useEffect, useState } from "react";
import { Lang } from "@/types/types";
import { CogIcon } from "@heroicons/react/20/solid";
import { useAccount, useEstimateGas, useSendTransaction } from "wagmi";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import Wallet from "@/app/[lang]/components/header/wallet";
import { polygon } from "viem/chains";
import { Address } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";
import useSWR from "swr";
import { fetcher } from "@/lib/axios/fetcher";
import { PriceResponse, QuoteResponse } from "@/pages/api/zerox/types";
import BlueButton from "@/app/[lang]/components/blueButton";
import Fail from "@/app/[lang]/components/modals/fail";

export const maticAddress: Address =
  "0x0000000000000000000000000000000000001010";

export type TradeDirection = "buy" | "sell";

export type Sort = "output" | "gas" | "time";

const Swap = ({ lang }: { lang: Lang }) => {
  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [fromAmount, setFromAmount] = useState<number | undefined>(undefined);
  const [fromTokenAddress, setFromTokenAddress] =
    useState<Address>(maticAddress);
  const [toPrice, setToPrice] = useState<number | null>(null);
  const [toTokenAddress, setToTokenAddress] =
    useState<Address>(trotelCoinAddress);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [price, setPrice] = useState<PriceResponse | null>(null);
  const [tradeDirection, setTradeDirection] = useState<TradeDirection>("buy");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { address: userAddress } = useAccount();

  const { isLoading: isLoadingPrice } = useSWR(
    [
      "/api/quote",
      {
        sellToken: price?.sellTokenAddress,
        buyToken: price?.buyTokenAddress,
        sellAmount: price?.sellAmount,
        buyAmount: 50000,
        userAddress,
        feeRecipient: 0,
        buyTokenPercentageFee: "",
      },
    ],
    fetcher,
    {
      onSuccess: (data) => {
        setQuote(data);
      },
    }
  );

  const { data } = useEstimateGas({
    chainId: polygon.id,
    to: quote?.to as Address,
    data: quote?.data,
  });

  const { sendTransactionAsync } = useSendTransaction();

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

  useEffect(() => {
    if (fromAmount && userAddress) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fromAmount, userAddress]);

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
                value={(fromAmount as number) < 0 ? 0 : fromAmount}
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
        <div className="px-4 pt-4">
          <BlueButton
            isFull={true}
            disabled={disabled}
            lang={lang}
            text={lang === "en" ? "Swap" : "Échanger"}
            onClick={() =>
              sendTransactionAsync({
                to: quote?.to as Address,
                data: quote?.data,
              })
            }
          />
        </div>
      </div>
      <div className="mt-4 block md:hidden">
        <Wallet lang={lang} isFull={true} isCentered={true} />
      </div>
      <Fail
        show={errorMessage}
        onClose={() => setErrorMessage(false)}
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en" ? "An error occurred" : "Une erreur s'est produite"
        }
      />
    </>
  );
};

export default Swap;
