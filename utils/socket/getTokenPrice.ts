import axios from "axios";
import { Address } from "viem";
import { SOCKET_API_KEY } from "@/config/socket";

export const getTokenPrice = async (tokenAddress: Address, chainId: number) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/token-price?tokenAddress=${tokenAddress}&chainId=${chainId}`,
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
