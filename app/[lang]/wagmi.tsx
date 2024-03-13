"use client";

import React from "react";
import { polygon, mainnet } from "wagmi/chains";
import { createConfig, http, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
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
