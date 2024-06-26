import { Slippage, Sort } from "@/types/web3/swap";
import { Token } from "@/types/web3/token";
import { Address, parseUnits, isAddressEqual } from "viem";
import { getQuote } from "@/utils/socket/getQuote";
import { getRouteTransactionData } from "@/utils/socket/getRouteTransactionData";
import { nativeAddress } from "@/data/web3/tokens";
import type { Chain } from "viem";
import { getContractAddress } from "@/data/web3/addresses";

export const fetchQuote = async (
  fromAmount: number,
  fromToken: Token,
  toToken: Token,
  fromChain: Chain,
  toChain: Chain,
  userAddress: Address,
  uniqueRoutesPerBridge: boolean,
  sort: Sort,
  singleTxOnly: boolean,
  enableRefuel: boolean,
  slippage: Slippage,
  trotelPrice: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setNoQuoteNotification: React.Dispatch<React.SetStateAction<boolean>>,
  setQuoteFetched: React.Dispatch<React.SetStateAction<boolean>>,
  setIsApproved: React.Dispatch<React.SetStateAction<boolean>>,
  setGasPrice: React.Dispatch<React.SetStateAction<number | null>>,
  setFromPrice: React.Dispatch<React.SetStateAction<number | null>>,
  setToPrice: React.Dispatch<React.SetStateAction<number | null>>,
  setSwapSlippage: React.Dispatch<React.SetStateAction<number | null>>,
  setBridgeSlippage: React.Dispatch<React.SetStateAction<number | null>>,
  setProtocolName: React.Dispatch<React.SetStateAction<string | null>>,
  setProtocolIcon: React.Dispatch<React.SetStateAction<string | null>>,
  setMinimumAmountOut: React.Dispatch<React.SetStateAction<number | null>>,
  setApiReturnData: React.Dispatch<React.SetStateAction<any>>,
  setApprovalData: React.Dispatch<React.SetStateAction<any>>,
  setAllowanceTarget: React.Dispatch<React.SetStateAction<Address | null>>,
  setToAmount: React.Dispatch<React.SetStateAction<number | undefined>>
) => {
  setIsLoading(true);

  const fromAmountDecimals: number = fromAmount
    ? Number(
        parseUnits(
          Number(fromAmount).toFixed(fromToken.decimals),
          fromToken.decimals
        )
      )
    : 0;

  const quote = await getQuote(
    fromChain.id,
    fromToken.address,
    toChain.id,
    toToken.address,
    fromAmountDecimals,
    userAddress,
    uniqueRoutesPerBridge,
    sort,
    singleTxOnly,
    enableRefuel,
    slippage
  );

  if (!quote) {
    throw Error;
  }

  const route = quote.result.routes[0];

  if (!route) {
    throw Error;
  }

  setGasPrice(route.totalGasFeesInUsd);
  setFromPrice(route.inputValueInUsd);
  setToPrice(route.outputValueInUsd);
  setSwapSlippage(route.userTxs[0]?.steps?.swapSlippage);
  setBridgeSlippage(route.userTxs[0]?.steps?.bridgeSlippage);
  setProtocolName(route.userTxs[0]?.protocol?.displayName);
  setProtocolIcon(route.userTxs[0]?.protocol?.icon);
  setMinimumAmountOut(route.userTxs[0]?.minAmountOut);

  const apiReturnData = await getRouteTransactionData(route, enableRefuel);

  setApiReturnData(apiReturnData);

  if (fromToken.address !== nativeAddress) {
    const approvalData = apiReturnData.result?.approvalData;

    if (!approvalData) {
      throw Error;
    }

    setApprovalData(approvalData);
    setAllowanceTarget(approvalData.allowanceTarget);
  }

  const toAmount = Number(Number(route?.toAmount).toFixed(0));

  setToAmount(route ? toAmount : 0);

  if (
    fromAmount &&
    fromToken &&
    fromToken.address &&
    getContractAddress(fromChain.id, "trotelCoinAddress") &&
    isAddressEqual(
      fromToken.address,
      getContractAddress(fromChain.id, "trotelCoinAddress")
    )
  ) {
    setFromPrice(trotelPrice * fromAmount * 1e-18);
  }

  if (
    toAmount &&
    toToken &&
    toToken.address &&
    getContractAddress(toChain.id, "trotelCoinAddress") &&
    isAddressEqual(
      toToken.address,
      getContractAddress(toChain.id, "trotelCoinAddress")
    )
  ) {
    setToPrice(trotelPrice * toAmount * 1e-18);
  }

  setQuoteFetched(true);
  setIsLoading(false);
};
