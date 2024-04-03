import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import {
  mainnet,
  polygon,
  polygonMumbai,
  optimism,
  bsc,
  base,
  avalanche,
  aurora,
  gnosis,
  mantle,
  linea,
  blast,
  fantom,
  zkSync,
  polygonZkEvm,
  arbitrum,
} from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "TrotelCoin App",
  description:
    "We're building TrotelCoin - the best app to learn & earn crypto.",
  url: "https://app.trotelcoin.com",
  icons: [""],
};

const chains = [
  mainnet,
  polygon,
  polygonMumbai,
  optimism,
  bsc,
  base,
  avalanche,
  aurora,
  gnosis,
  mantle,
  linea,
  blast,
  fantom,
  zkSync,
  polygonZkEvm,
  arbitrum,
] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableEmail: false,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
    [optimism.id]: http(),
    [bsc.id]: http(),
    [base.id]: http(),
    [avalanche.id]: http(),
    [aurora.id]: http(),
    [gnosis.id]: http(),
    [mantle.id]: http(),
    [linea.id]: http(),
    [blast.id]: http(),
    [fantom.id]: http(),
    [zkSync.id]: http(),
    [polygonZkEvm.id]: http(),
    [arbitrum.id]: http(),
  },
});
