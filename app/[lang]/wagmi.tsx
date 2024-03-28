"use client";

import React from "react";
import {
  polygon,
  mainnet,
  optimism,
  bsc,
  gnosis,
  fantom,
  zkSync,
  polygonZkEvm,
  mantle,
  base,
  arbitrum,
  avalanche,
  linea,
  blast,
  aurora,
} from "wagmi/chains";
import { createConfig, http, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig({
  chains: [
    mainnet,
    polygon,
    optimism,
    bsc,
    gnosis,
    fantom,
    zkSync,
    polygonZkEvm,
    mantle,
    base,
    arbitrum,
    avalanche,
    linea,
    blast,
    aurora,
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [bsc.id]: http(),
    [gnosis.id]: http(),
    [fantom.id]: http(),
    [zkSync.id]: http(),
    [polygonZkEvm.id]: http(),
    [mantle.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [avalanche.id]: http(),
    [linea.id]: http(),
    [blast.id]: http(),
    [aurora.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Wagmi({ children }: { children: React.ReactNode }) {
  try {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    );
  } catch (error) {
    console.error("Error in Wagmi component:", error);
    return <body>Error occurred. Please try again.</body>;
  }
}
