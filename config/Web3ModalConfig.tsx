import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import {
  mainnet,
  polygon,
  polygonAmoy,
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
  arbitrum
} from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

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
  arbitrum
] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableEmail: true, // seems unstable
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [mainnet.id]: http("", { batch: { wait: 16 } }),
    [polygon.id]: http("", { batch: { wait: 16 } }),
    [polygonAmoy.id]: http("", { batch: { wait: 16 } }),
    [optimism.id]: http("", { batch: { wait: 16 } }),
    [bsc.id]: http("", { batch: { wait: 16 } }),
    [base.id]: http("", { batch: { wait: 16 } }),
    [avalanche.id]: http("", { batch: { wait: 16 } }),
    [aurora.id]: http("", { batch: { wait: 16 } }),
    [gnosis.id]: http("", { batch: { wait: 16 } }),
    [mantle.id]: http("", { batch: { wait: 16 } }),
    [linea.id]: http("", { batch: { wait: 16 } }),
    [blast.id]: http("", { batch: { wait: 16 } }),
    [fantom.id]: http("", { batch: { wait: 16 } }),
    [zkSync.id]: http("", { batch: { wait: 16 } }),
    [polygonZkEvm.id]: http("", { batch: { wait: 16 } }),
    [arbitrum.id]: http("", { batch: { wait: 16 } })
  }
});
