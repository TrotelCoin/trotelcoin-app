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
  smartWallet,
  en,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { Lang } from "@/types/types";

const smartWalletOptions = {
  factoryAddress: "0xc8984fdfdd1796a338a81d37ab54cf8283c11e7d",
  gasless: true,
};

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
            smartWallet(
              embeddedWallet({
                auth: {
                  options: ["email", "google", "apple", "facebook"],
                },
              }),
              smartWalletOptions
            ),
            trustWallet({ recommended: true }),
            zerionWallet(),
            rainbowWallet(),
            phantomWallet(),
          ],
        }),
        smartWallet(
          embeddedWallet({
            auth: {
              options: ["email", "google", "apple", "facebook"],
            },
            recommended: true,
          }),
          smartWalletOptions
        ),
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
