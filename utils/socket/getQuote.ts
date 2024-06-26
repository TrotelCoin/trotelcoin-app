import { Slippage, Sort } from "@/types/web3/swap";
import axios from "axios";
import { Address } from "viem";
import { SOCKET_API_KEY } from "@/config/socket";

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
          "API-KEY": SOCKET_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
    .then((response) => response.data);

  return response;
};
