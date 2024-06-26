import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage, http } from "wagmi";
import { mainnet, polygon, polygonAmoy } from "viem/chains";
import { fallback, webSocket } from "@wagmi/core";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "TrotelCoin App",
  description:
    "We're building TrotelCoin - the best app to learn & earn crypto.",
  url: "https://app.trotelcoin.com",
  icons: [""]
};

const chains = [mainnet, polygon, polygonAmoy] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true,
    showWallets: true,
    walletFeatures: true,
    socials: ["google", "apple", "discord", "facebook", "github", "x"]
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [mainnet.id]: fallback([
      webSocket(process.env.MAINNET_ALCHEMY_URL),
      http("", { batch: { wait: 16 } })
    ]),
    [polygon.id]: fallback([
      webSocket(process.env.POLYGON_ALCHEMY_URL),
      http("", { batch: { wait: 16 } })
    ]),
    [polygonAmoy.id]: fallback([
      webSocket(process.env.POLYGON_AMOY_ALCHEMY_URL),
      http("", { batch: { wait: 16 } })
    ])
  }
});
