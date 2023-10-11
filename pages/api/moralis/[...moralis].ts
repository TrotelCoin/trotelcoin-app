import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY as string,
  authentication: {
    domain: "amazing.dapp",
    uri: process.env.NEXTAUTH_URL as string,
    timeout: 120,
  },
});
