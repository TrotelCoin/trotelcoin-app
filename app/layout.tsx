// Import necessary modules and components

import React from "react";
import "@/app/globals.css";
import SessionProviderComponent from "@/app/sessionProvider";
import Wagmi from "@/app/wagmi";
import Script from "next/script";
import { Session } from "next-auth";
import MainComponent from "@/app/main";

export const metadata = {
  title: "TrotelCoin App",
  description: "Learn & earn crypto.",
};

export default function Layout({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        {/* Set metadata for SEO */}
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta
          name="keywords"
          content="trotelcoin, learn, earn, crypto, bitcoin, ethereum"
        />
        <meta
          property="og:image"
          content="/assets/banner/trotelcoin-banner.png"
        />
        <meta
          property="twitter:image"
          content="/assets/banner/trotelcoin-banner.png"
        ></meta>
        <meta
          property="twitter:card"
          content="/assets/banner/trotelcoin-banner.png"
        ></meta>
        <meta property="twitter:title" content={metadata.title}></meta>
        <meta
          property="twitter:description"
          content={metadata.description}
        ></meta>
        <meta property="og:url" content="https://app.trotelcoin.com" />
        <meta charSet="UTF-8"></meta>
        <meta name="theme-color" content="#fff" />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <link rel="manifest" href="/manifest.json" as="manifest" />
        <link
          rel="apple-touch-icon"
          href="/assets/logo/trotelcoin.png"
          as="image"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" as="icon" />

        {/* Define Apple splash screen images for different devices */}
        <link
          href="/pwa-splash/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
          as="image"
        />
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

      {/* Use Suspense for loading fallback */}

      <Wagmi>
        <SessionProviderComponent session={session}>
          <MainComponent children={children} />
        </SessionProviderComponent>
      </Wagmi>
    </html>
  );
}
