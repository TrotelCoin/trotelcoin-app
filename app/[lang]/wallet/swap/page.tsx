"use client";

import React, { useEffect, useState } from "react";
import type { Lang } from "@/types/lang";
import { ChainSource, Slippage, Sort, TokenSource } from "@/types/web3/swap";
import {
  useAccount,
  useSendTransaction,
  useBalance,
  useBlockNumber,
  useReadContract,
  useWriteContract,
  useSwitchChain,
} from "wagmi";
import { polygonChain } from "@/data/web3/chains";
import { polygon } from "viem/chains";
import { Address, formatUnits, Hash } from "viem";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";
import WidgetTitle from "@/app/[lang]/wallet/components/widgetTitle";
import "animate.css";
import SwapButton from "@/app/[lang]/wallet/components/swap/swapButton";
import FailNotification from "@/app/[lang]/components/modals/failNotification";
import { ArrowPathIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import {
  getBridgeStatus,
  getFromTokenList,
  getToTokenList,
  getChainList,
} from "@/lib/socket/socket";
import { usdcPolygon, trotelCoinPolygon } from "@/data/web3/tokens";
import From from "@/app/[lang]/wallet/components/swap/from";
import To from "@/app/[lang]/wallet/components/swap/to";
import { useDebounce } from "use-debounce";
import { Token } from "@/types/web3/token";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import SwapData from "@/app/[lang]/wallet/components/swap/swapData";
import TokenList from "@/app/[lang]/wallet/components/swap/tokenList";
import Settings from "@/app/[lang]/wallet/components/swap/settings";
import { Chain } from "@/types/web3/chain";
import ChainList from "@/app/[lang]/wallet/components/swap/chainList";
import allowanceAbi from "@/abi/allowance";
import { fetchQuote } from "@/lib/socket/socket";

const Swap = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [fromAmount, setFromAmount] = useState<number | undefined>(undefined);
  const [fromChain, setFromChain] = useState<Chain>(polygonChain);
  const [toChain, setToChain] = useState<Chain>(polygonChain);
  const [fromToken, setFromToken] = useState<Token>(usdcPolygon);
  const [toPrice, setToPrice] = useState<number | null>(null);
  const [toToken, setToToken] = useState<Token>(trotelCoinPolygon);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [fromBalance, setFromBalance] = useState<number | null>(null);
  const [toBalance, setToBalance] = useState<number | null>(null);
  const [uniqueRoutesPerBridge] = useState<boolean>(true);
  const [sort, setSort] = useState<Sort>("output");
  const [singleTxOnly] = useState<boolean>(true);
  const [needApproval, setNeedApproval] = useState<boolean>(true);
  const [approvalData, setApprovalData] = useState<any>(null);
  const [txHash, setTxHash] = useState<Hash | null>(null);
  const [apiReturnData, setApiReturnData] = useState<any>(null);
  const [toAmount, setToAmount] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [swappedMessage, setSwappedMessage] = useState<boolean>(false);
  const [noQuoteNotification, setNoQuoteNotification] =
    useState<boolean>(false);
  const [quoteFetched, setQuoteFetched] = useState<boolean>(false);
  const [fromTokens, setFromTokens] = useState<Token[]>([]);
  const [toTokens, setToTokens] = useState<Token[]>([]);
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [swapSlippage, setSwapSlippage] = useState<number | null>(null);
  const [protocolName, setProtocolName] = useState<string | null>(null);
  const [protocolIcon, setProtocolIcon] = useState<string | null>(null);
  const [minimumAmountOut, setMinimumAmountOut] = useState<number | null>(null);
  const [enableRefuel, setEnableRefuel] = useState<boolean>(false);
  const [tokenList, setTokenList] = useState<TokenSource>("from");
  const [openTokenList, setOpenTokenList] = useState<boolean>(false);
  const [chainList, setChainList] = useState<ChainSource>("from");
  const [openChainList, setOpenChainList] = useState<boolean>(false);
  const [fromChains, setFromChains] = useState<Chain[]>([]);
  const [toChains, setToChains] = useState<Chain[]>([]);
  const [bridgeSlippage, setBridgeSlippage] = useState<number | null>(null);
  const [slippage, setSlippage] = useState<Slippage>("2");
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [approveMessage, setApproveMessage] = useState<boolean>(false);
  const [allowance, setAllowance] = useState<number | null>(null);
  const [allowanceTarget, setAllowanceTarget] = useState<Address | null>(null);

  const { address: userAddress } = useAccount();

  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (fromChain) {
      switchChain({ chainId: fromChain.chainId });
    } else {
      switchChain({ chainId: polygon.id });
    }
  }, [userAddress, fromChain]);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: fromChain.chainId,
  });

  const { data: fromBalanceData, refetch: refetchFrom } = useBalance({
    address: userAddress,
    token: fromToken.address,
    chainId: fromChain.chainId,
  });

  const { data: toBalanceData, refetch: refetchTo } = useBalance({
    address: userAddress,
    token: toToken.address,
    chainId: toChain.chainId,
  });

  const { data: fromNativeBalanceData, refetch: refetchFromNative } =
    useBalance({
      address: userAddress,
      chainId: fromChain.chainId,
    });

  const { data: toNativeBalanceData, refetch: refetchToNative } = useBalance({
    address: userAddress,
    chainId: toChain.chainId,
  });

  const exchangeTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  useEffect(() => {
    setIsLoading(true);
    refetchFrom();
    refetchTo();
    refetchFromNative();
    refetchToNative();
    setIsLoading(false);
  }, [
    blockNumber,
    userAddress,
    fromToken,
    toToken,
    refetchFrom,
    refetchTo,
    refetchFromNative,
    refetchToNative,
    fromChain,
    toChain,
  ]);

  useEffect(() => {
    if (fromBalanceData && fromToken.address !== fromChain.currency.address) {
      const balance = Number(fromBalanceData?.formatted);
      setFromBalance(balance);
    }

    if (toBalanceData && toToken.address !== toChain.currency.address) {
      const balance = Number(toBalanceData?.formatted);
      setToBalance(balance);
    }

    if (
      fromNativeBalanceData &&
      fromToken.address === fromChain.currency.address
    ) {
      const balance = Number(fromNativeBalanceData?.formatted);
      setFromBalance(balance);
    }

    if (toNativeBalanceData && toToken.address === toChain.currency.address) {
      const balance = Number(toNativeBalanceData?.formatted);
      setToBalance(balance);
    }
  }, [
    fromBalanceData,
    toBalanceData,
    fromNativeBalanceData,
    toNativeBalanceData,
  ]);

  const { writeContractAsync: approvingAsync, isPending: isPendingApproving } =
    useWriteContract({
      mutation: {
        onSuccess: () => {
          setApproveMessage(true);
          setIsApproved(true);
        },
        onError: () => {
          setErrorMessage(true);
          setIsApproved(false);
        },
      },
    });

  const { sendTransactionAsync: swappingAsync } = useSendTransaction({
    mutation: {
      onSuccess: () => {
        setSwappedMessage(true);
      },
      onError: () => {
        setErrorMessage(true);
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
      fromAmount <= (fromBalance as number) &&
      !isLoading &&
      toAmount &&
      toAmount > 0 &&
      toToken &&
      fromToken &&
      quoteFetched
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    fromAmount,
    userAddress,
    fromBalance,
    isLoading,
    toAmount,
    toToken,
    quoteFetched,
    fromToken,
  ]);

  const [debouncedFromAmount] = useDebounce(fromAmount, 1000);

  const handleRefresh = async () => {
    await fetchQuote(
      fromAmount as number,
      fromToken,
      toToken,
      fromChain,
      toChain,
      userAddress as Address,
      uniqueRoutesPerBridge,
      sort,
      singleTxOnly,
      enableRefuel,
      slippage,
      setIsLoading,
      setNoQuoteNotification,
      setQuoteFetched,
      setIsApproved,
      setGasPrice,
      setFromPrice,
      setToPrice,
      setSwapSlippage,
      setBridgeSlippage,
      setProtocolName,
      setProtocolIcon,
      setMinimumAmountOut,
      setApiReturnData,
      setApprovalData,
      setAllowanceTarget,
      setToAmount
    ).catch((error) => {
      console.error(error);
      setIsLoading(false);
      setNoQuoteNotification(true);
      setQuoteFetched(false);
      setIsApproved(false);
    });
  };

  useEffect(() => {
    if (userAddress && fromAmount && fromAmount > 0) {
      handleRefresh();
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
    fromChain,
    toChain,
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
      const fromTokens = await getFromTokenList(
        fromChain.chainId,
        toChain.chainId
      );
      const toTokens = await getToTokenList(fromChain.chainId, toChain.chainId);

      if (fromTokens && toTokens) {
        setFromTokens(fromTokens.result);
        setToTokens(toTokens.result);
        setFromToken(fromTokens.result[0]);
        if (toChain.chainId === polygon.id) {
          setToToken(trotelCoinPolygon);
        } else {
          setToToken(toTokens.result[0]);
        }
      }

      if (fromChain.chainId === polygon.id) {
        fromTokens.result.unshift(trotelCoinPolygon);
      }

      if (toChain.chainId === polygon.id) {
        toTokens.result.unshift(trotelCoinPolygon);
      }
    };

    if (fromChain.chainId && toChain.chainId) {
      fetchTokensList();
    }
  }, [fromChain, toChain]);

  useEffect(() => {
    const fetchChainsList = async () => {
      setIsLoading(true);
      const fromChains = await getChainList();
      const toChains = await getChainList();

      if (fromChains) {
        setFromChains(fromChains.result);
      }

      if (toChains) {
        setToChains(toChains.result);
      }

      setIsLoading(false);
    };

    fetchChainsList();
  }, []);

  useEffect(() => {
    if (txHash) {
      const txStatus = setInterval(async () => {
        const status = await getBridgeStatus(
          txHash,
          fromChain.chainId,
          toChain.chainId
        );

        if (!status) {
          return;
        }

        if (status.result.destinationTxStatus == "COMPLETED") {
          clearInterval(txStatus);
        }
      }, 20000);
    }
  }, [txHash]);

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: fromToken.address,
    abi: allowanceAbi,
    chainId: fromChain.chainId,
    functionName: "allowance",
    args: [userAddress, approvalData?.allowanceTarget],
  });

  useEffect(() => {
    refetchAllowance();
  }, [fromToken, userAddress, refetchAllowance, blockNumber, fromChain]);

  useEffect(() => {
    if (allowanceData) {
      const allowance = Number(
        formatUnits(allowanceData as bigint, fromToken.decimals)
      );
      setAllowance(allowance);
    }
  }, [allowanceData]);

  useEffect(() => {
    if (allowance && fromAmount) {
      if (fromAmount > allowance) {
        setNeedApproval(true);
        setIsApproved(false);
      } else {
        setNeedApproval(false);
      }
    } else {
      setNeedApproval(true);
    }
  }, [allowance, fromAmount]);

  return (
    <>
      <div className="mx-auto flex flex-col max-w-md justify-center w-full items-center">
        <div className="flex items-center w-full justify-between">
          <WidgetTitle
            title={lang === "en" ? "Swap" : "Échanger"}
            lang={lang}
          />
          <div className="flex items-center gap-2">
            <BlueSimpleButton
              onClick={() => refetchQuote()}
              disabled={
                isLoading || !userAddress || !fromAmount || fromAmount <= 0
              }
            >
              <ArrowPathIcon
                className={`w-4 h-4 md:h-5 md:w-5 text-gray-100 ${
                  isLoading && "animate-spin"
                }`}
              />
            </BlueSimpleButton>

            <Settings
              lang={lang}
              enableRefuel={enableRefuel}
              setEnableRefuel={setEnableRefuel}
              setSort={setSort}
              sort={sort}
              setSlippage={setSlippage}
              slippage={slippage}
            />
          </div>
        </div>

        <div className="w-full mt-4 flex flex-col flex-wrap bg-gray-50 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="px-4">
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
              fromChain={fromChain}
              userAddress={userAddress as Address}
              setOpenTokenList={setOpenTokenList}
              setTokenList={setTokenList}
              setOpenChainList={setOpenChainList}
              setChainList={setChainList}
            />
          </div>
        </div>

        <div className="my-4 flex justify-center items-center">
          <BlueSimpleButton
            onClick={() => exchangeTokens()}
            isRoundedFull={true}
          >
            <ArrowsUpDownIcon className="w-4 h-4 md:h-5 md:w-5 text-gray-100" />
          </BlueSimpleButton>
        </div>

        <div className="w-full flex flex-col flex-wrap bg-gray-50 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="px-4">
            <To
              lang={lang}
              toAmount={toAmount as number}
              toPrice={toPrice as number}
              toBalance={toBalance as number}
              toToken={toToken}
              isLoading={isLoading}
              toChain={toChain}
              fromPrice={fromPrice as number}
              setOpenTokenList={setOpenTokenList}
              setTokenList={setTokenList}
              setOpenChainList={setOpenChainList}
              setChainList={setChainList}
            />
          </div>
        </div>

        <div className="mt-4 w-full">
          <SwapButton
            lang={lang}
            userAddress={userAddress as Address}
            disabled={disabled}
            needApproval={needApproval}
            apiReturnData={apiReturnData}
            swappingAsync={swappingAsync}
            setTxHash={
              setTxHash as React.Dispatch<React.SetStateAction<string>>
            }
            approvingAsync={approvingAsync}
            isLoading={isLoading}
            fromChain={fromChain}
            isPendingApproving={isPendingApproving}
            isApproved={isApproved}
            quoteFetched={quoteFetched}
            allowanceTarget={allowanceTarget as Address}
            fromAmount={fromAmount as number}
            fromToken={fromToken}
          />
        </div>

        <div className="w-full">
          <SwapData
            lang={lang}
            isLoading={isLoading}
            gasPrice={gasPrice as number}
            slippage={slippage}
            protocolName={protocolName as string}
            protocolIcon={protocolIcon as string}
            minimumAmountOut={minimumAmountOut as number}
            toToken={toToken}
            enableRefuel={enableRefuel}
            sort={sort}
            bridgeSlippage={bridgeSlippage as number}
          />
        </div>

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
        <ChainList
          lang={lang}
          openChainList={openChainList}
          setOpenChainList={setOpenChainList}
          fromChains={fromChains}
          toChains={toChains}
          setFromChain={setFromChain}
          setToChain={setToChain}
          chainList={chainList}
          fromChain={fromChain}
          toChain={toChain}
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
          show={approveMessage}
          onClose={() => setApproveMessage(false)}
          lang={lang}
          title={lang === "en" ? "Success" : "Succès"}
          message={
            lang === "en"
              ? "You approved the amount"
              : "Vous avez approuvé le montant"
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
      </div>
    </>
  );
};

export default Swap;
