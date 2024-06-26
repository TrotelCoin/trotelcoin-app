import axios from "axios";

export const getChainList = async () => {
  const response = await axios
    .get(`https://api.socket.tech/v2/supported/chains`, {
      headers: {
        "API-KEY": process.env.SOCKET_API_KEY as string,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.data);

  return response;
};
