"use client";

import React from "react";
import { bsc } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

// Define supported blockchain chains and project ID
const projectId = "b0d3d1eb9c28fb7899eba1cff830b2b1";
export const metadata = {
  title: "TrotelCoin App",
  description: "Learn & earn crypto.",
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function Wagmi({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
