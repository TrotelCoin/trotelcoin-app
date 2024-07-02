import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import {
  mainnet,
  polygon,
  polygonAmoy,
  optimism,
  bsc,
  gnosis,
  zkSync,
  polygonZkEvm,
  mantle,
  base,
  mode,
  arbitrum,
  avalanche,
  linea,
  blast,
  scroll,
  zora,
  aurora
} from "viem/chains";
import { fallback, http, webSocket } from "@wagmi/core";
import { rpcs } from "@/config/rpcs";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "TrotelCoin App",
  description:
    "We're building TrotelCoin - the best app to learn & earn crypto.",
  url: "https://app.trotelcoin.com",
  icons: [""]
};

const chains = [
  mainnet,
  polygon,
  polygonAmoy,
  optimism,
  bsc,
  gnosis,
  zkSync,
  polygonZkEvm,
  mantle,
  base,
  mode,
  arbitrum,
  avalanche,
  linea,
  blast,
  scroll,
  zora,
  aurora
] as const;

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
      http("", {
        batch: {
          wait: 16
        }
      }),
      webSocket(rpcs[mainnet.id].transports.wss[0]),
      webSocket(rpcs[mainnet.id].transports.wss[1])
    ]),
    [polygon.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      }),
      webSocket(rpcs[polygon.id].transports.wss[0]),
      webSocket(rpcs[polygon.id].transports.wss[1])
    ]),
    [polygonAmoy.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      }),
      webSocket(rpcs[polygonAmoy.id].transports.wss[0]),
      webSocket(rpcs[polygonAmoy.id].transports.wss[1])
    ]),
    [optimism.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [bsc.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [gnosis.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [zkSync.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [polygonZkEvm.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [mantle.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [base.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [mode.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [arbitrum.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [avalanche.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [linea.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [blast.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [scroll.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [zora.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ]),
    [aurora.id]: fallback([
      http("", {
        batch: {
          wait: 16
        }
      })
    ])
  }
});
