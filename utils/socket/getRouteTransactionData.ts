import axios from "axios";

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
          "Content-Type": "application/json"
        }
      }
    )
    .then((response) => response.data);

  return response;
};
