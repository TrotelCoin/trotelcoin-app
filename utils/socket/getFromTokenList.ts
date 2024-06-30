import axios from "axios";
import { SOCKET_API_KEY } from "@/config/socket";

export const getFromTokenList = async (
  fromChainId: number,
  toChainId: number
) => {
  const response = await axios
    .get(
      `https://api.socket.tech/v2/token-lists/from-token-list?fromChainId=${fromChainId}&toChainId=${toChainId}&isShortList=true`,
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
