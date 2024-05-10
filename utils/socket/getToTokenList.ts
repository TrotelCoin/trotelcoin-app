import axios from "axios";

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
    .then((response) => response.data);

  return response;
};
