"use client";

import React, { useEffect, useState } from "react";
import type { Lang } from "@/types/lang";
import { Sort, TokenSource } from "@/types/web3/swap";
import {
  useAccount,
  useSendTransaction,
  useBalance,
  useBlockNumber,
} from "wagmi";
import { polygon } from "viem/chains";
import { Address, Hash, parseUnits } from "viem";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";
import WidgetTitle from "@/app/[lang]/wallet/components/widgetTitle";
import "animate.css";
import SwapButton from "@/app/[lang]/wallet/components/swap/swapButton";
import FailNotification from "@/app/[lang]/components/modals/failNotification";
import {
  ArrowPathIcon,
  ArrowsUpDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/20/solid";
import {
  getQuote,
  getRouteTransactionData,
  getBridgeStatus,
  checkAllowance,
  getApprovalTransactionData,
  getFromTokenList,
  getToTokenList,
} from "@/lib/socket/socket";
import { usdcPolygon, trotelCoinPolygon } from "@/data/web3/tokens";
import From from "@/app/[lang]/wallet/components/swap/from";
import To from "@/app/[lang]/wallet/components/swap/to";
import { useDebounce } from "use-debounce";
import { Token } from "@/types/web3/token";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import SwapData from "@/app/[lang]/wallet/components/swap/swapData";
import TokenList from "@/app/[lang]/wallet/components/swap/tokenList";

const Swap = ({ lang }: { lang: Lang }) => {
  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [fromAmount, setFromAmount] = useState<number | undefined>(undefined);
  const [fromChainId] = useState<number>(polygon.id);
  const [toChainId] = useState<number>(polygon.id);
  const [fromToken, setFromToken] = useState<Token>(usdcPolygon);
  const [toPrice, setToPrice] = useState<number | null>(null);
  const [toToken, setToToken] = useState<Token>(trotelCoinPolygon);
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
  const [swappedMessage, setSwappedMessage] = useState<boolean>(false);
  const [noQuoteNotification, setNoQuoteNotification] =
    useState<boolean>(false);
  const [quoteFetched, setQuoteFetched] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [fromTokens, setFromTokens] = useState<Token[]>([]);
  const [toTokens, setToTokens] = useState<Token[]>([]);
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [swapSlippage, setSwapSlippage] = useState<number | null>(null);
  const [protocolName, setProtocolName] = useState<string | null>(null);
  const [protocolIcon, setProtocolIcon] = useState<string | null>(null);
  const [protocolUrl, setProtocolUrl] = useState<string | null>(null);
  const [minimumAmountOut, setMinimumAmountOut] = useState<number | null>(null);
  const [enableRefuel, setEnableRefuel] = useState<boolean>(false);
  const [tokenList, setTokenList] = useState<TokenSource>("from");
  const [openTokenList, setOpenTokenList] = useState<boolean>(false);

  const { address: userAddress } = useAccount();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: polygon.id,
  });

  const { data: fromBalanceData, refetch: refetchFrom } = useBalance({
    address: userAddress,
    token: fromToken.address,
    chainId: polygon.id,
  });

  const { data: toBalanceData, refetch: refetchTo } = useBalance({
    address: userAddress,
    token: toToken.address,
    chainId: polygon.id,
  });

  const exchangeTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  useEffect(() => {
    refetchFrom();
    refetchTo();
  }, [blockNumber, userAddress, fromToken, toToken, refetchFrom, refetchTo]);

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

  const refetchQuote = () => {
    setQuoteFetched(false);
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

  const [debouncedFromAmount] = useDebounce(fromAmount, 1000);

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true);

      const fromAmountDecimals: number = fromAmount
        ? Number(parseUnits(fromAmount.toString(), fromToken.decimals))
        : 0;

      const quote = await getQuote(
        fromChainId,
        fromToken.address,
        toChainId,
        toToken.address,
        fromAmountDecimals,
        userAddress as Address,
        uniqueRoutesPerBridge,
        sort,
        singleTxOnly,
        enableRefuel
      );

      if (!quote) {
        setIsLoading(false);
        setNoQuoteNotification(true);
        setQuoteFetched(false);
        return;
      }

      const route = quote.result.routes[0];
      setGasPrice(quote.result.routes[0].totalGasFeesInUsd);
      setFromPrice(quote.result.routes[0].inputValueInUsd);
      setToPrice(quote.result.routes[0].outputValueInUsd);
      console.log("test", quote.result.routes[0].userTxs[0]);
      setSwapSlippage(quote.result.routes[0].userTxs[0].swapSlippage);
      setProtocolName(quote.result.routes[0].userTxs[0].protocol.displayName);
      setProtocolIcon(quote.result.routes[0].userTxs[0].protocol.icon);
      setMinimumAmountOut(quote.result.routes[0].userTxs[0].minAmountOut);

      if (!route) {
        setIsLoading(false);
        setNoQuoteNotification(true);
        setQuoteFetched(false);
        return;
      }

      const apiReturnData = await getRouteTransactionData(route, enableRefuel);

      setApiReturnData(apiReturnData);

      const approvalData = apiReturnData.result?.approvalData;

      if (!approvalData) {
        setIsLoading(false);
        setNoQuoteNotification(true);
        setQuoteFetched(false);
        return;
      }

      const toAmount = Number(Number(route?.toAmount).toFixed(0));

      setToAmount(route ? toAmount : 0);

      setApprovalData(approvalData);
      setQuoteFetched(true);
      setIsLoading(false);
    };

    if (userAddress && fromAmount && fromAmount > 0) {
      fetchQuote();
    } else {
      setToAmount(0);
      setQuoteFetched(false);
      setGasPrice(null);
      setFromPrice(null);
      setToPrice(null);
      setSwapSlippage(null);
      setProtocolName(null);
      setProtocolIcon(null);
      setMinimumAmountOut(null);
    }
  }, [
    debouncedFromAmount,
    fromChainId,
    toChainId,
    userAddress,
    fromToken,
    toToken,
    uniqueRoutesPerBridge,
    sort,
    singleTxOnly,
    quoteFetched,
  ]);

  useEffect(() => {
    const fetchTokensList = async () => {
      const fromTokens = await getFromTokenList(fromChainId, toChainId);
      const toTokens = await getToTokenList(fromChainId, toChainId);

      if (fromTokens && toTokens) {
        setFromTokens(fromTokens.result);
        setToTokens(toTokens.result);
        setFromToken(fromTokens.result[0]);
        if (toChainId === polygon.id) {
          setToToken(trotelCoinPolygon);
        } else {
          setToToken(toTokens.result[0]);
        }
      }

      if (fromChainId === polygon.id || toChainId === polygon.id) {
        fromTokens.result.unshift(trotelCoinPolygon);
      }
    };

    if (fromChainId && toChainId) {
      fetchTokensList();
    }
  }, [fromChainId, toChainId]);

  useEffect(() => {
    if (txHash) {
      const txStatus = setInterval(async () => {
        const status = await getBridgeStatus(txHash, fromChainId, toChainId);

        if (!status) {
          return;
        }

        if (status.result.destinationTxStatus == "COMPLETED") {
          clearInterval(txStatus);
        }
      }, 20000);
    }
  }, [txHash]);

  useEffect(() => {
    const fetchApproval = async () => {
      const { allowanceTarget, minimumApprovalAmount } = approvalData;

      const allowanceCheckStatus = await checkAllowance(
        fromChainId,
        userAddress as Address,
        allowanceTarget,
        fromToken.address
      );

      const allowanceValue = allowanceCheckStatus.result?.value;

      if (minimumApprovalAmount > allowanceValue) {
        const approvalTransactionData = await getApprovalTransactionData(
          fromChainId,
          userAddress as Address,
          allowanceTarget,
          fromToken.address,
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
    }
  }, [approvalData, userAddress, fromToken.address, fromChainId]);

  return (
    <>
      <div className="w-full flex flex-col flex-wrap bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between px-4 pb-4">
          <WidgetTitle
            title={lang === "en" ? "Swap" : "Échanger"}
            lang={lang}
          />
          <div className="flex items-center gap-2">
            <BlueSimpleButton onClick={() => exchangeTokens()}>
              <ArrowsUpDownIcon className="w-4 h-4 md:h-5 md:w-5 text-gray-100" />
            </BlueSimpleButton>
            <BlueSimpleButton
              onClick={() => refetchQuote()}
              disabled={
                isLoading || !userAddress || !fromAmount || !quoteFetched
              }
            >
              <ArrowPathIcon
                className={`w-4 h-4 md:h-5 md:w-5 text-gray-100 ${
                  isLoading && "animate-spin"
                }`}
              />
            </BlueSimpleButton>
            <BlueSimpleButton onClick={() => setOpenSettings(true)}>
              <Cog6ToothIcon className="w-4 h-4 md:h-5 md:w-5 text-gray-100" />
            </BlueSimpleButton>
          </div>
        </div>

        <div className="px-4 py-4">
          <From
            lang={lang}
            fromAmount={fromAmount as number}
            fromBalance={fromBalance as number}
            fromPrice={fromPrice as number}
            fromToken={fromToken}
            setFromAmount={
              setFromAmount as React.Dispatch<React.SetStateAction<number>>
            }
            isLoading={isLoading}
            fromChainId={fromChainId}
            userAddress={userAddress as Address}
            setOpenTokenList={setOpenTokenList}
            setTokenList={setTokenList}
          />
        </div>

        <div className="px-4 py-4">
          <To
            lang={lang}
            toAmount={toAmount as number}
            toPrice={toPrice as number}
            toBalance={toBalance as number}
            toToken={toToken}
            isLoading={isLoading}
            toChainId={toChainId}
            fromPrice={fromPrice as number}
            setOpenTokenList={setOpenTokenList}
            setTokenList={setTokenList}
          />
        </div>

        <div className="px-4 pt-4">
          <SwapButton
            lang={lang}
            userAddress={userAddress as Address}
            disabled={disabled}
            needApproval={needApproval}
            approvalTransactionData={approvalTransactionData}
            apiReturnData={apiReturnData}
            swappingAsync={swappingAsync}
            setTxHash={
              setTxHash as React.Dispatch<React.SetStateAction<string>>
            }
            approvingAsync={approvingAsync}
            isLoading={isLoading}
            fromChainId={fromChainId}
            quoteFetched={quoteFetched}
            toAmount={toAmount as number}
            enableRefuel={enableRefuel}
            setEnableRefuel={setEnableRefuel}
          />
        </div>
      </div>

      <SwapData
        lang={lang}
        isLoading={isLoading}
        gasPrice={gasPrice as number}
        swapSlippage={swapSlippage as number}
        protocolName={protocolName as string}
        protocolIcon={protocolIcon as string}
        minimumAmountOut={minimumAmountOut as number}
        toToken={toToken}
        enableRefuel={enableRefuel}
      />

      <TokenList
        lang={lang}
        setFromToken={setFromToken}
        setToToken={setToToken}
        fromTokens={fromTokens}
        toTokens={toTokens}
        tokenList={tokenList}
        openTokenList={openTokenList}
        setOpenTokenList={setOpenTokenList}
      />
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
      <FailNotification
        display={noQuoteNotification}
        lang={lang}
        title={lang === "en" ? "No quote" : "Pas de devis"}
        message={
          lang === "en"
            ? "An error occured while fetching the quote."
            : "Une erreur est survenue lors de la récupération du devis."
        }
      />
    </>
  );
};

export default Swap;
