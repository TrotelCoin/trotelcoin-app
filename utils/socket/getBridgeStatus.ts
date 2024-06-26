import axios from "axios";
import { Address } from "viem";

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
          "API-KEY": process.env.SOCKET_API_KEY as string,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
    .then((response) => response.data);

  return response;
};
