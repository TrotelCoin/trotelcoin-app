import { Address } from "viem";
import { Sort } from "@/types/types";

export const getQuote = async (
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

export const getRouteTransactionData = async (route: any) => {
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

export const checkAllowance = async (
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

export const getApprovalTransactionData = async (
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

export const getBridgeStatus = async (
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
