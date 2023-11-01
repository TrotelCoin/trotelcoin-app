"use client";

import React from "react";
import { bsc } from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";

// Define supported blockchain chains and project ID
const chains = [bsc];
const projectId = "b0d3d1eb9c28fb7899eba1cff830b2b1";
export const metadata = {
  title: "TrotelCoin App",
  description: "Learn & earn crypto.",
};

// Configure Web3Modal with default settings
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// Create an instance of Web3Modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "light",
  themeVariables: {
    "--w3m-font-family": "Poppins",
  },
});

export default function Wagmi({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
