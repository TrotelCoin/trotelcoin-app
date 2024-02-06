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
  factoryAddress: "YOUR_FACTORY_ADDRESS",
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
        smartWallet(metamaskWallet({ recommended: true }), smartWalletOptions),
        smartWallet(coinbaseWallet(), smartWalletOptions),
        smartWallet(walletConnect({ recommended: true }), smartWalletOptions),
        smartWallet(rabbyWallet({ recommended: true }), smartWalletOptions),
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
            smartWallet(trustWallet({ recommended: true }), smartWalletOptions),
            smartWallet(zerionWallet(), smartWalletOptions),
            smartWallet(rainbowWallet(), smartWalletOptions),
            smartWallet(phantomWallet(), smartWalletOptions),
          ],
        }),
        smartWallet(
          embeddedWallet({
            auth: {
              options: ["email", "google", "apple", "facebook"],
            },
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
        domain: "https://app.trotelcoin.com",
      }}
    >
      {children}
    </ThirdwebProvider>
  );
}
