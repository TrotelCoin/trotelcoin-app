import { Address, parseUnits } from "viem";
import type { Slippage, Sort } from "@/types/web3/swap";
import axios from "axios";
import { Token } from "@/types/web3/token";
import { Chain } from "@/types/web3/chain";
import { nativeAddress } from "@/data/web3/tokens";
import { SocketChain } from "@/types/socket/socket";

export const getQuote = async (
  fromChainId: number,
  fromTokenAddress: Address,
  toChainId: number,
  toTokenAddress: Address,
  fromAmount: number,
  userAddress: Address,
  uniqueRoutesPerBridge: boolean,
  sort: Sort,
  singleTxOnly: boolean,
  enableRefuel: boolean,
  slippage: Slippage
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&fromAmount=${fromAmount}&userAddress=${userAddress}&uniqueRoutesPerBridge=${uniqueRoutesPerBridge}&sort=${sort}&singleTxOnly=${singleTxOnly}&bridgeWithGas=${enableRefuel}&defaultSwapSlippage=${slippage}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

export const getRouteTransactionData = async (
  route: any,
  enableRefuel: boolean
) => {
  const response = await axios
    .post(
      `https://api.socket.tech/v2/build-tx?bridgeWithGas=${enableRefuel}`,
      { route: route },
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

export const checkAllowance = async (
  chainId: number,
  owner: Address,
  allowanceTarget: Address,
  tokenAddress: Address
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/approval/check-allowance?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

export const getApprovalTransactionData = async (
  chainId: number,
  owner: Address,
  allowanceTarget: Address,
  tokenAddress: Address,
  amount: number
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/approval/build-tx?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}&amount=${amount}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

export const getBridgeStatus = async (
  transactionHash: Address,
  fromChainId: number,
  toChainId: number
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/bridge-status?transactionHash=${transactionHash}&fromChainId=${fromChainId}&toChainId=${toChainId}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

export const getFromTokenList = async (
  fromChainId: number,
  toChainId: number
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/token-lists/from-token-list?fromChainId=${fromChainId}&toChainId=${toChainId}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

export const getToTokenList = async (
  fromChainId: number,
  toChainId: number
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/token-lists/to-token-list?fromChainId=${fromChainId}&toChainId=${toChainId}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

export const getTokenPrice = async (tokenAddress: Address, chainId: number) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/token-price?tokenAddress=${tokenAddress}&chainId=${chainId}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

export const getChainList = async () => {
  const response = await axios
    .get(`https://api.socket.tech/v2/supported/chains`, {
      headers: {
        "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return response;
};

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
    ? Number(parseUnits(String(fromAmount), fromToken.decimals))
    : 0;

  const quote = await getQuote(
    fromChain.chainId,
    fromToken.address,
    toChain.chainId,
    toToken.address,
    fromAmountDecimals,
    userAddress as Address,
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
  setQuoteFetched(true);
  setIsLoading(false);
};

export const fetchSupportedChains = async () => {
  const response = await axios
    .get("https://api.socket.tech/v2/supported/chains", {
      headers: {
        "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });

  return response;
};

export const isRefuelSupported = async (fromChain: Chain, toChain: Chain) => {
  const { result: chains } = await fetchSupportedChains();

  const fromChainResponse = chains.filter((chain: SocketChain) => {
    return chain.chainId === fromChain.chainId;
  });

  const toChainResponse = chains.filter((chain: SocketChain) => {
    return chain.chainId === toChain.chainId;
  });

  const refuelEnabled: boolean =
    fromChainResponse[0].refuel.sendingEnabled &&
    toChainResponse[0].refuel.receivingEnabled;

  return refuelEnabled;
};
