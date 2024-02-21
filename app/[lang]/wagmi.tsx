"use client";

import React from "react";
import { polygon, mainnet } from "wagmi/chains";
import { http, createConfig, WagmiProvider } from "wagmi";

const config = createConfig({
  chains: [polygon, mainnet],
  transports: {
    [polygon.id]: http(),
    [mainnet.id]: http(),
  },
});

export default function Wagmi({ children }: { children: React.ReactNode }) {
  try {
    return <WagmiProvider config={config}>{children}</WagmiProvider>;
  } catch (error) {
    console.error("Error in Wagmi component:", error);
    return <body>Error occurred. Please try again.</body>;
  }
}
