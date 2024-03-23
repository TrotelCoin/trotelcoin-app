import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "TrotelCoin App",
  description:
    "We're building TrotelCoin - the best app to learn & earn crypto.",
  url: "https://app.trotelcoin.com",
  icons: [""],
};

const chains = [mainnet, polygon] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableEmail: false,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
