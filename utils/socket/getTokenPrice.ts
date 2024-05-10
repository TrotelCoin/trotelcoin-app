import axios from "axios";
import { Address } from "viem";

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
    .then((response) => response.data);

  return response;
};
