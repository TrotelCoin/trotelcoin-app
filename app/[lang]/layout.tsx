// Import necessary modules and components
import React from "react";
import SessionProviderComponent from "@/app/[lang]/sessionProvider";
import Wagmi from "@/app/[lang]/wagmi";
import "@/app/[lang]/globals.css";
import { Session } from "next-auth";
import RouterComponent from "@/app/[lang]/routerComponent";
import ThirdWebProvider from "@/app/[lang]/ThirdWebProvider";
import { Lang } from "@/types/types";
import type { Metadata } from "next";
import Script from "next/script";

export const revalidate = 10; // revalidate every 10 seconds

export const metadata: Metadata = {
  title: "TrotelCoin App",
  description:
    "TrotelCoin, a web3 platform, facilitates connecting, attracting, and retaining users through interactive experiences. Join a community exploring crypto daily through Quests, Streaks, Activities, and beyond.",
  generator: "Next.js",
  manifest: "/manifest.json",
  appleWebApp: true,
  keywords:
    "trotelcoin, learn, earn, crypto, bitcoin, ethereum, trotelcoin app, trotelcoin.com, trotelcoin app, trotelcoin app",
  themeColor: "#fff",
  authors: [{ name: "TrotelCoin" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "TrotelCoin App",
    type: "website",
    locale: "en_US",
    url: "https://app.trotelcoin.com",
    siteName: "TrotelCoin App",
    description:
      "TrotelCoin, a web3 platform, facilitates connecting, attracting, and retaining users through interactive experiences. Join a community exploring crypto daily through Quests, Streaks, Activities, and beyond.",
    images: [
      {
        url: "https://app.trotelcoin.com/assets/logo/trotelcoin.png",
        width: 800,
        height: 600,
        alt: "TrotelCoin App",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@trotelcoin",
    creator: "@trotelcoin",
    title: "TrotelCoin App",
  },
};

export default function Layout({
  session,
  children,
  params: { lang },
}: {
  session: Session;
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  return (
    <>
      {/* Use Suspense for loading fallback */}
      <Wagmi>
        <ThirdWebProvider lang={lang}>
          <SessionProviderComponent session={session}>
            <RouterComponent lang={lang}>
              <html lang={lang}>
                <head>
                  <link
                    rel="apple-touch-icon"
                    href="/assets/logo/trotelcoin.png"
                    as="image"
                  />
                  <link rel="icon" href="/favicon.ico" sizes="any" as="icon" />
                  <Script strategy="lazyOnload">
                    {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3685770,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
                  </Script>
                </head>
                {children}
              </html>
            </RouterComponent>
          </SessionProviderComponent>
        </ThirdWebProvider>
      </Wagmi>
    </>
  );
}
