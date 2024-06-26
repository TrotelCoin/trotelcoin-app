"use client";

import React, { ReactNode, useContext } from "react";
import { config, projectId } from "@/config/Web3ModalConfig";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";
import { polygon } from "viem/chains";
import ThemeContext from "@/contexts/theme";

const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const { theme } = useContext(ThemeContext);

  createWeb3Modal({
    wagmiConfig: config,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
    enableAnalytics: true,
    themeMode: theme,
    enableOnramp: true,
    defaultChain: polygon,
    termsConditionsUrl: "https://app.trotelcoin.com/en/terms-of-service"
  });

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
