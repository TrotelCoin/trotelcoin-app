import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, polygon, polygonAmoy } from "viem/chains";
import { fallback, http, webSocket } from "@wagmi/core";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

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
      webSocket(
        `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY as string}`
      ),
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [polygon.id]: fallback([
      webSocket(
        `wss://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY as string}`
      ),
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [polygonAmoy.id]: fallback([
      webSocket(
        `wss://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY as string}`
      ),
      http("", {
        batch: {
          wait: 16
        }
      })
    ])
  }
});
