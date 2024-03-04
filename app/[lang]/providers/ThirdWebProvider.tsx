"use client";

import React from "react";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  rainbowWallet,
  rabbyWallet,
  safeWallet,
  phantomWallet,
  trustWallet,
  zerionWallet,
  en,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { Lang } from "@/types/types";
import { ethers } from "ethers";

export const signer = new ethers.providers.Web3Provider(
  window.ethereum
).getSigner();

export default function ThirdWebProvider({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  return (
    <ThirdwebProvider
      activeChain="polygon"
      clientId="2df090c727adc0d357cb129145005409"
      locale={en()}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet(),
        walletConnect({ recommended: true }),
        rabbyWallet({ recommended: true }),
        safeWallet({
          personalWallets: [
            metamaskWallet({
              recommended: true,
            }),
            rabbyWallet({ recommended: true }),
            coinbaseWallet(),

            walletConnect({
              recommended: true,
            }),
            embeddedWallet({
              auth: {
                options: ["email", "google", "apple", "facebook"],
              },
            }),
            trustWallet({ recommended: true }),
            zerionWallet(),
            rainbowWallet(),
            phantomWallet(),
          ],
        }),
        embeddedWallet({
          auth: {
            options: ["email", "google", "apple", "facebook"],
          },
          recommended: true,
        }),
        trustWallet({ recommended: true }),
        zerionWallet(),
        rainbowWallet(),
        phantomWallet(),
      ]}
      authConfig={{
        authUrl: "/api/auth",
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN ?? "",
      }}
    >
      {children}
    </ThirdwebProvider>
  );
}
