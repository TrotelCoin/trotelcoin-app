"use client";

import React, { useEffect, useState } from "react";
import type { Lang } from "@/types/lang";
import { Sort } from "@/types/web3/swap";
import {
  useAccount,
  useSendTransaction,
  useBalance,
  useBlockNumber,
} from "wagmi";
import { polygon } from "viem/chains";
import { Address, Hash, parseUnits } from "viem";
import { trotelCoinAddress } from "@/data/web3/addresses";
import Fail from "@/app/[lang]/components/modals/fail";
import Success from "@/app/[lang]/components/modals/success";
import WidgetTitle from "@/app/[lang]/wallet/components/widgetTitle";
import "animate.css";
import SwapButton from "@/app/[lang]/wallet/components/swap/swapButton";
import {
  getQuote,
  getRouteTransactionData,
  getBridgeStatus,
  checkAllowance,
  getApprovalTransactionData,
} from "@/lib/socket/socket";
import { usdc, trotelCoin, matic } from "@/data/web3/tokens";
import From from "@/app/[lang]/wallet/components/swap/from";
import To from "@/app/[lang]/wallet/components/swap/to";
import { useDebounce } from "use-debounce";
import { Token } from "@/types/web3/token";

const Swap = ({ lang }: { lang: Lang }) => {
  const [fromPrice, setFromPrice] = useState<number | null>(null);
  const [fromAmount, setFromAmount] = useState<number | undefined>(undefined);
  const [fromChainId] = useState<number>(polygon.id);
  const [toChainId] = useState<number>(polygon.id);
  const [fromToken, setFromToken] = useState<Token>(matic);
  const [toPrice, setToPrice] = useState<number | null>(null);
  const [toToken, setToToken] = useState<Token>(trotelCoin);
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
  const [toDecimals, setToDecimals] = useState<number>(trotelCoin.decimals);
  const [swappedMessage, setSwappedMessage] = useState<boolean>(false);

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
        ? Number(parseUnits(fromAmount.toString(), fromDecimals))
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
        singleTxOnly
      );

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
      setToAmount(0);
    }
  }, [
    debouncedFromAmount,
    fromChainId,
    toChainId,
    userAddress,
    fromToken.address,
    toToken.address,
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

      if (!status) {
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
      <div className="mt-8 w-full flex flex-col flex-wrap bg-gray-100 border backdrop-blur-xl divide-y divide-gray-900/10 dark:divide-gray-100/10 border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between px-4 pb-4">
          <WidgetTitle
            title={lang === "en" ? "Swap" : "Échanger"}
            lang={lang}
          />
        </div>

        <div className="px-4 py-4">
          <From
            lang={lang}
            fromAmount={fromAmount as number}
            fromBalance={fromBalance as number}
            fromPrice={fromPrice as number}
            fromTokenAddress={fromToken.address}
            setFromAmount={
              setFromAmount as React.Dispatch<React.SetStateAction<number>>
            }
            isLoading={isLoading}
            fromChainId={fromChainId}
          />
        </div>

        <div className="px-4 py-4">
          <To
            lang={lang}
            toAmount={toAmount as number}
            toPrice={toPrice as number}
            toBalance={toBalance as number}
            toTokenAddress={toToken.address}
            isLoading={isLoading}
            toChainId={toChainId}
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
          />
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
