import axios from "axios";
import { SOCKET_API_KEY } from "@/config/socket";

export const getChainList = async () => {
  const response = await axios
    .get(`https://api.socket.tech/v2/supported/chains`, {
      headers: {
        "API-KEY": SOCKET_API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.data);

  return response;
};
