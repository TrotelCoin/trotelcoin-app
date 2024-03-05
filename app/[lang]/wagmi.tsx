"use client";

import React from "react";
import { polygon, mainnet } from "wagmi/chains";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function Wagmi({ children }: { children: React.ReactNode }) {
  try {
    return <WagmiConfig config={config}>{children}</WagmiConfig>;
  } catch (error) {
    console.error("Error in Wagmi component:", error);
    return <body>Error occurred. Please try again.</body>;
  }
}
