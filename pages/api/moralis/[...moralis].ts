import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY as string,
  authentication: {
    domain: process.env.NEXTAUTH_URL
      ? new URL(process.env.NEXTAUTH_URL).host
      : "",
    uri: process.env.NEXTAUTH_URL as string,
    timeout: 120,
  },
});
