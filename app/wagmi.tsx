"use client";

import React from "react";
import { bsc } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";

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
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains: [bsc],
      options: {
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "b0d3d1eb9c28fb7899eba1cff830b2b1",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Browser Wallet",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function Wagmi({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
