import axios from "axios";

export const fetchSupportedChains = async () => {
  const response = await axios
    .get("https://api.socket.tech/v2/supported/chains", {
      headers: {
        "API-KEY": process.env.NEXT_PUBLIC_SOCKET_API_KEY as string,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);

  return response;
};
