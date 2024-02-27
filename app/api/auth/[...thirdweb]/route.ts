import { ThirdwebAuthAppRouter } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuthAppRouter({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN ?? "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY ?? ""),
});

export { ThirdwebAuthHandler as GET, ThirdwebAuthHandler as POST };
