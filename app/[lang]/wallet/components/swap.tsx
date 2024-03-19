"use client";

import React, { useEffect, useState } from "react";
import { Lang } from "@/types/types";
import {
  useAccount,
  useSendTransaction,
  useBalance,
  useBlockNumber,
} from "wagmi";
import Wallet from "@/app/[lang]/components/header/wallet";
import { polygon } from "viem/chains";
import { Address, Hash, parseUnits } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";
import BlueButton from "@/app/[lang]/components/blueButton";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";

export type Token = {
  address: Address;
  decimals: number;
};

export const trotel: Token = {
  address: trotelCoinAddress,
  decimals: 18,
};

export const usdc: Token = {
  address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
  decimals: 6,
};

export type Sort = "output" | "gas" | "time";

const getQuote = async (
  fromChainId: number,
  fromTokenAddress: Address,
  toChainId: number,
  toTokenAddress: Address,
  fromAmount: number,
  userAddress: Address,
  uniqueRoutesPerBridge: boolean,
  sort: Sort,
  singleTxOnly: boolean
) => {
  const response = await fetch(
    `https://api.socket.tech/v2/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&fromAmount=${fromAmount}&userAddress=${userAddress}&uniqueRoutesPerBridge=${uniqueRoutesPerBridge}&sort=${sort}&singleTxOnly=${singleTxOnly}`,
    {
      method: "GET",
      headers: {
        "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
};

const getRouteTransactionData = async (route: any) => {
  const response = await fetch("https://api.socket.tech/v2/build-tx", {
    method: "POST",
    headers: {
      "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ route: route }),
  });

  const json = await response.json();
  return json;
};

const checkAllowance = async (
  chainId: number,
  owner: Address,
  allowanceTarget: Address,
  tokenAddress: Address
) => {
  const response = await fetch(
    `https://api.socket.tech/v2/approval/check-allowance?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}`,
    {
      method: "GET",
      headers: {
        "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
};

const getApprovalTransactionData = async (
  chainId: number,
  owner: Address,
  allowanceTarget: Address,
  tokenAddress: Address,
  amount: number
) => {
  const response = await fetch(
    `https://api.socket.tech/v2/approval/build-tx?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}&amount=${amount}`,
    {
      method: "GET",
      headers: {
        "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
};

const getBridgeStatus = async (
  transactionHash: Address,
  fromChainId: number,
  toChainId: number
) => {
  const response = await fetch(
    `https://api.socket.tech/v2/bridge-status?transactionHash=${transactionHash}&fromChainId=${fromChainId}&toChainId=${toChainId}`,
    {
      method: "GET",
      headers: {
        "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
};

const Swap = ({ lang }: { lang: Lang }) => {
  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [fromAmount, setFromAmount] = useState<number | undefined>(undefined);
  const [fromChainId] = useState<number>(polygon.id);
  const [toChainId] = useState<number>(polygon.id);
  const [fromTokenAddress, setFromTokenAddress] = useState<Address>(
    usdc.address
  );
  const [toPrice, setToPrice] = useState<number | null>(null);
  const [toTokenAddress, setToTokenAddress] =
    useState<Address>(trotelCoinAddress);
  const [quote, setQuote] = useState<any>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [fromBalance, setFromBalance] = useState<number | null>(null);
  const [toBalance, setToBalance] = useState<number | null>(null);
  const [uniqueRoutesPerBridge] = useState<boolean>(true);
  const [sort] = useState<Sort>("output");
  const [singleTxOnly] = useState<boolean>(true);
  const [needApproval, setNeedApproval] = useState<boolean>(true);
  const [approvalData, setApprovalData] = useState<any>(null);
  const [txHash, setTxHash] = useState<Hash | null>(null);
  const [apiReturnData, setApiReturnData] = useState<any>(null);
  const [approvalTransactionData, setApprovalTransactionData] =
    useState<any>(null);
  const [toAmount, setToAmount] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fromDecimals, setFromDecimals] = useState<number>(usdc.decimals);
  const [toDecimals, setToDecimals] = useState<number>(trotel.decimals);
  const [swappedMessage, setSwappedMessage] = useState<boolean>(false);

  const { address: userAddress } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: fromBalanceData, refetch: refetchFrom } = useBalance({
    address: userAddress,
    token: fromTokenAddress,
    chainId: polygon.id,
  });

  const { data: toBalanceData, refetch: refetchTo } = useBalance({
    address: userAddress,
    token: toTokenAddress,
    chainId: polygon.id,
  });

  useEffect(() => {
    refetchFrom();
    refetchTo();
  }, [blockNumber, userAddress]);

  useEffect(() => {
    if (fromBalanceData) {
      const balance = Number(fromBalanceData?.formatted);
      setFromBalance(balance);
    }

    if (toBalanceData) {
      const balance = Number(toBalanceData?.formatted);
      setToBalance(balance);
    }
  }, [fromBalanceData, toBalanceData]);

  const { sendTransactionAsync: approvingAsync } = useSendTransaction({
    mutation: {
      onSuccess: () => {
        setNeedApproval(false);
      },
    },
  });
  const { sendTransactionAsync: swappingAsync } = useSendTransaction({
    mutation: {
      onSuccess: () => {
        setSwappedMessage(true);
      },
    },
  });

  const tokenAddressToName = (tokenAddress: Address) => {
    switch (tokenAddress) {
      case trotelCoinAddress:
        return "TROTEL";
      case usdc.address:
        return "USDC";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    if (
      fromAmount &&
      userAddress &&
      toBalance &&
      fromAmount <= (fromBalance as number) &&
      !isLoading
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fromAmount, userAddress, toBalance, fromBalance, isLoading]);

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true);

      const fromAmountDecimals: number = fromAmount
        ? Number(parseUnits(fromAmount.toString(), fromDecimals))
        : 0;

      const quote = await getQuote(
        fromChainId,
        fromTokenAddress,
        toChainId,
        toTokenAddress,
        fromAmountDecimals,
        userAddress as Address,
        uniqueRoutesPerBridge,
        sort,
        singleTxOnly
      );

      setQuote(quote);

      const route = quote.result.routes[0];

      const apiReturnData = await getRouteTransactionData(route);

      setApiReturnData(apiReturnData);

      const approvalData = apiReturnData.result?.approvalData;

      const toAmount = Number(Number(route?.toAmount).toFixed(0));

      setToAmount(route ? toAmount : 0);

      setApprovalData(approvalData);
      setIsLoading(false);
    };

    if (userAddress && fromAmount) {
      fetchQuote();
    } else {
      setQuote(null);
      setToAmount(0);
    }
  }, [
    fromAmount,
    fromChainId,
    toChainId,
    userAddress,
    fromTokenAddress,
    toTokenAddress,
    uniqueRoutesPerBridge,
    sort,
    singleTxOnly,
  ]);

  useEffect(() => {
    const txStatus = setInterval(async () => {
      const status = await getBridgeStatus(
        txHash as Address,
        fromChainId,
        toChainId
      );

      if (status.code !== 200) {
        return;
      }

      if (status.result.destinationTxStatus == "COMPLETED") {
        clearInterval(txStatus);
      }
    }, 20000);
  }, [txHash]);

  useEffect(() => {
    const fetchApproval = async () => {
      const { allowanceTarget, minimumApprovalAmount } = approvalData;

      const allowanceCheckStatus = await checkAllowance(
        fromChainId,
        userAddress as Address,
        allowanceTarget,
        fromTokenAddress
      );

      const allowanceValue = allowanceCheckStatus.result?.value;

      if (minimumApprovalAmount > allowanceValue) {
        const approvalTransactionData = await getApprovalTransactionData(
          fromChainId,
          userAddress as Address,
          allowanceTarget,
          fromTokenAddress,
          minimumApprovalAmount
        );

        setNeedApproval(true);
        setApprovalTransactionData(approvalTransactionData);
      } else {
        setNeedApproval(false);
      }
    };

    if (approvalData && userAddress) {
      fetchApproval();
    } else {
      setNeedApproval(false);
    }
  }, [approvalData, userAddress, fromTokenAddress, fromChainId]);

  return (
    <>
      <div className="mt-8 w-full flex flex-col flex-wrap bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex flex-col">
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
        </div>

        <div className="px-4 py-4">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {lang === "en" ? "Pay with" : "Acheter avec"}
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
                value={(fromAmount as number) < 0 ? 0 : fromAmount}
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
        </div>

        <div className="px-4 py-4">
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
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-4xl font-semibold text-gray-900 dark:text-gray-100 w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-transparent focus:border-transparent cursor-not-allowed"
                onWheel={(e) => e.preventDefault()}
                value={toAmount ? Number((toAmount * 1e-18).toFixed(2)) : 0}
                disabled={true}
              />
              <div className="flex flex-col justify-center items-end">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {tokenAddressToName(toTokenAddress)}
                </span>
                <span className="text-xs">
                  $
                  {toPrice
                    ? Number(toPrice?.toFixed(2)).toLocaleString("en-US")
                    : "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          {userAddress ? (
            needApproval ? (
              <BlueButton
                isFull={true}
                disabled={disabled}
                lang={lang}
                isLoading={isLoading}
                text={lang === "en" ? "Approve" : "Approuver"}
                onClick={async () => {
                  await approvingAsync({
                    to: approvalTransactionData.result?.to,
                    data: approvalTransactionData.result?.data,
                    chainId: fromChainId,
                  });
                }}
              />
            ) : (
              <BlueButton
                isFull={true}
                disabled={disabled}
                lang={lang}
                isLoading={isLoading}
                text={lang === "en" ? "Swap" : "Échanger"}
                onClick={async () => {
                  const txHash = await swappingAsync({
                    account: userAddress,
                    to: apiReturnData.result.txTarget,
                    value: apiReturnData.result.value,
                    data: apiReturnData.result.txData,
                  });

                  setTxHash(txHash);
                }}
              />
            )
          ) : (
            <Wallet lang={lang} isFull={true} isCentered={true} />
          )}
        </div>
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
      <Success
        show={swappedMessage}
        onClose={() => setSwappedMessage(false)}
        lang={lang}
        title={lang === "en" ? "Success" : "Succès"}
        message={lang === "en" ? "Swap successful !" : "Échange réussi !"}
      />
    </>
  );
};

export default Swap;
