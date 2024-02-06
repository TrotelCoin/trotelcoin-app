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
            smartWallet(
              metamaskWallet({
                recommended: true,
              }),
              smartWalletOptions
            ),
            smartWallet(rabbyWallet({ recommended: true }), smartWalletOptions),
            smartWallet(coinbaseWallet(), smartWalletOptions),
            smartWallet(
              walletConnect({
                recommended: true,
              }),
              smartWalletOptions
            ),
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
        smartWallet(trustWallet({ recommended: true }), smartWalletOptions),
        smartWallet(zerionWallet(), smartWalletOptions),
        smartWallet(rainbowWallet(), smartWalletOptions),
        smartWallet(phantomWallet(), smartWalletOptions),
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
