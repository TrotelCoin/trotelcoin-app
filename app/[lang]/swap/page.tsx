"use client";

import React, { useContext, useEffect, useState } from "react";
import type { Lang } from "@/types/language/lang";
import { ChainSource, Slippage, Sort, TokenSource } from "@/types/web3/swap";
import {
  useAccount,
  useSendTransaction,
  useBalance,
  useBlockNumber,
  useReadContract,
  useWriteContract,
  useSwitchChain,
  useTransactionConfirmations
} from "wagmi";
import { polygonChain } from "@/data/web3/chains";
import { polygon } from "viem/chains";
import { Address, formatUnits, Hash } from "viem";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import WidgetTitle from "@/app/[lang]/components/widget/widgetTitle";
import "animate.css";
import SwapButton from "@/app/[lang]/swap/components/buttons/swapButton";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { ArrowPathIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { getBridgeStatus } from "@/utils/socket/getBridgeStatus";
import { usdcPolygon, trotelCoinPolygon } from "@/data/web3/tokens";
import From from "@/app/[lang]/swap/components/direction/from";
import To from "@/app/[lang]/swap/components/direction/to";
import { useDebounce } from "use-debounce";
import { Token } from "@/types/web3/token";
import BlueSimpleButton from "@/app/[lang]/components/buttons/blueSimple";
import SwapData from "@/app/[lang]/swap/components/swapData";
import TokenList from "@/app/[lang]/swap/components/lists/tokenList";
import Settings from "@/app/[lang]/swap/components/settings";
import { Chain } from "@/types/web3/chain";
import ChainList from "@/app/[lang]/swap/components/lists/chainList";
import abis from "@/abis/abis";
import { fetchQuote } from "@/utils/socket/fetchQuote";
import { getFromTokenList } from "@/utils/socket/getFromTokenList";
import { getChainList } from "@/utils/socket/getChainList";
import { getToTokenList } from "@/utils/socket/getToTokenList";
import { isRefuelSupported } from "@/utils/socket/isRefuelSupported";
import TrotelPriceContext from "@/contexts/trotelPrice";

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
  const [isLoadingTokens, setIsLoadingTokens] = useState<boolean>(false);
  const [isLoadingChains, setIsLoadingChains] = useState<boolean>(false);
  const [isLoadingBlockchain, setIsLoadingBlockchain] =
    useState<boolean>(false);
  const [isLoadingTokensBalance, setIsLoadingTokensBalance] =
    useState<boolean>(false);
  const [disableRefuel, setDisableRefuel] = useState<boolean>(false);
  const [swappedConfirmed, setSwappedConfirmed] = useState<boolean>(false);
  const [isLoadingTransaction, setIsLoadingTransaction] =
    useState<boolean>(false);
  const [swappedMessageConfirmation, setSwappedMessageConfirmation] =
    useState<boolean>(false);

  const { address: userAddress } = useAccount();

  const { storedTrotelPrice } = useContext(TrotelPriceContext);

  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (fromChain) {
      switchChain({ chainId: fromChain.chainId });
    } else {
      switchChain({ chainId: polygon.id });
    }
  }, [userAddress, fromChain, switchChain]);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: fromChain.chainId
  });

  const { data: fromBalanceData, refetch: refetchFrom } = useBalance({
    address: userAddress,
    token: fromToken.address,
    chainId: fromChain.chainId
  });

  const { data: toBalanceData, refetch: refetchTo } = useBalance({
    address: userAddress,
    token: toToken.address,
    chainId: toChain.chainId
  });

  const { data: fromNativeBalanceData, refetch: refetchFromNative } =
    useBalance({
      address: userAddress,
      chainId: fromChain.chainId
    });

  const { data: toNativeBalanceData, refetch: refetchToNative } = useBalance({
    address: userAddress,
    chainId: toChain.chainId
  });

  const exchangeTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

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
    fromChain,
    fromToken,
    toChain,
    toToken
  ]);

  const {
    writeContractAsync: approvingAsync,
    isPending: isPendingApproving,
    data: approveHash
  } = useWriteContract({
    mutation: {
      onMutate: () => {
        setIsLoadingTransaction(true);
      },
      onSuccess: () => {
        setIsLoadingTransaction(true);
      },
      onError: () => {
        setErrorMessage(true);
        setIsApproved(false);
        setIsLoadingTransaction(false);
      }
    }
  });

  const { data: approveConfirmation, refetch: refetchApproveConfirmation } =
    useTransactionConfirmations({
      chainId: polygon.id,
      hash: approveHash
    });

  useEffect(() => {
    if (
      approveConfirmation &&
      Number(approveConfirmation) > 0 &&
      !swappedConfirmed
    ) {
      setApproveMessage(true);
      setIsApproved(true);
      setIsLoadingTransaction(false);
      setSwappedConfirmed(true);
    }
  }, [approveConfirmation, swappedConfirmed]);

  const { sendTransactionAsync: swappingAsync, data: swappedHash } =
    useSendTransaction({
      mutation: {
        onSuccess: () => {
          setSwappedConfirmed(false);
          setIsLoadingTransaction(true);
        },
        onMutate: () => {
          setIsLoadingTransaction(true);
        },
        onError: () => {
          setErrorMessage(true);
          setIsLoadingTransaction(false);
        }
      }
    });

  const {
    data: transactionConfirmation,
    refetch: refetchTransactionConfirmation
  } = useTransactionConfirmations({
    chainId: polygon.id,
    hash: swappedHash as Hash
  });

  useEffect(() => {
    if (
      transactionConfirmation &&
      Number(transactionConfirmation) > 0 &&
      !swappedMessageConfirmation
    ) {
      setSwappedMessage(true);
      setSwappedMessageConfirmation(true);
      setIsLoadingTransaction(false);
    }
  }, [transactionConfirmation, swappedMessageConfirmation]);

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
    fromToken
  ]);

  const [debouncedFromAmount] = useDebounce(fromAmount, 1000);

  useEffect(() => {
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
        storedTrotelPrice as number,
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
    fromAmount,
    enableRefuel,
    slippage,
    storedTrotelPrice
  ]);

  useEffect(() => {
    const fetchTokensList = async () => {
      setIsLoadingTokens(true);

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

      setIsLoadingTokens(false);
    };

    if (fromChain.chainId && toChain.chainId) {
      fetchTokensList();
    }
  }, [fromChain, toChain]);

  useEffect(() => {
    const fetchChainsList = async () => {
      setIsLoadingChains(true);

      const fromChains = await getChainList();
      const toChains = await getChainList();

      if (fromChains) {
        setFromChains(fromChains.result);
      }

      if (toChains) {
        setToChains(toChains.result);
      }

      setIsLoadingChains(false);
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
  }, [txHash, fromChain, toChain]);

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: fromToken.address,
    abi: abis[fromChain.chainId].allowance,
    chainId: fromChain.chainId,
    functionName: "allowance",
    args: [userAddress as Address, approvalData?.allowanceTarget]
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
  }, [allowanceData, fromToken]);

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

  useEffect(() => {
    if (
      isLoadingChains ||
      isLoadingTokens ||
      isLoadingBlockchain ||
      isLoadingTokensBalance ||
      isLoadingTransaction
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [
    isLoadingTokens,
    isLoadingChains,
    isLoadingBlockchain,
    isLoadingTokensBalance,
    isLoadingTransaction
  ]);

  useEffect(() => {
    if (fromChain && toChain) {
      const fetchIsRefuelSupported = async () => {
        const refuelEnabled = await isRefuelSupported(fromChain, toChain);

        if (refuelEnabled) {
          setDisableRefuel(false);
        } else {
          setEnableRefuel(false);
          setDisableRefuel(true);
        }
      };

      fetchIsRefuelSupported();
    } else {
      setEnableRefuel(false);
      setDisableRefuel(true);
    }
  }, [fromChain, toChain]);

  useEffect(() => {
    setIsLoadingBlockchain(true);
    refetchFrom();
    refetchTo();
    refetchFromNative();
    refetchToNative();
    refetchApproveConfirmation();
    refetchTransactionConfirmation();
    setIsLoadingBlockchain(false);
  }, [
    blockNumber,
    userAddress,
    fromToken,
    toToken,
    fromChain,
    toChain,
    refetchApproveConfirmation,
    refetchFrom,
    refetchFromNative,
    refetchToNative,
    refetchTransactionConfirmation,
    refetchTo
  ]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
        <div className="flex w-full items-center justify-between">
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
                className={`h-4 w-4 text-gray-100 md:h-5 md:w-5 ${
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
              disableRefuel={disableRefuel}
            />
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col flex-wrap divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white py-4 text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="px-4">
            <From
              lang={lang}
              fromAmount={fromAmount as number}
              fromBalance={fromBalance as number}
              fromPrice={fromPrice as number}
              fromToken={fromToken}
              setFromAmount={setFromAmount}
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

        <div className="my-4 flex items-center justify-center">
          <BlueSimpleButton
            onClick={() => exchangeTokens()}
            isRoundedFull={true}
          >
            <ArrowsUpDownIcon className="h-4 w-4 text-gray-100 md:h-5 md:w-5" />
          </BlueSimpleButton>
        </div>

        <div className="flex w-full flex-col flex-wrap divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white py-4 text-gray-900 backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
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
          setIsLoadingTokensBalance={setIsLoadingTokensBalance}
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

        <FailNotification
          display={errorMessage}
          onClose={() => setErrorMessage(false)}
          lang={lang}
          title={lang === "en" ? "Error" : "Erreur"}
          message={
            lang === "en" ? "An error occurred" : "Une erreur s'est produite"
          }
        />
        <SuccessNotification
          display={approveMessage}
          onClose={() => setApproveMessage(false)}
          lang={lang}
          title={lang === "en" ? "Success" : "Succès"}
          message={
            lang === "en"
              ? "You approved the amount"
              : "Vous avez approuvé le montant"
          }
        />
        <SuccessNotification
          display={swappedMessage}
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
