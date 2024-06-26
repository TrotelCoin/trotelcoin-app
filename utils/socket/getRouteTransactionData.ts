import axios from "axios";
import { SOCKET_API_KEY } from "@/config/socket";

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
          "API-KEY": SOCKET_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
    .then((response) => response.data);

  return response;
};
