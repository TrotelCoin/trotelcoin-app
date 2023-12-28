"use client";

import React from "react";
import { polygon } from "wagmi/chains";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";

const { publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains: [polygon],
      options: {
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains: [polygon],
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains: [polygon],
      options: {
        projectId: "b0d3d1eb9c28fb7899eba1cff830b2b1",
      },
    }),
    new InjectedConnector({
      chains: [polygon],
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
  try {
    return <WagmiConfig config={config}>{children}</WagmiConfig>;
  } catch (error) {
    console.error("Error in Wagmi component:", error);
    return <body>Error occurred. Please try again.</body>;
  }
}
