// Import necessary modules and components

import React, { Suspense } from "react";
import "@/app/globals.css";
import NextTopLoader from "nextjs-toploader";
import Loading from "@/app/ui/interface/loading";
import { poppins } from "@/app/ui/fonts";
import Wagmi from "@/app/wagmi";
import Header from "@/app/ui/interface/header";
import Banner from "@/app/ui/interface/banner";
import { Analytics } from "@vercel/analytics/react";
import IntractParam from "@/app/intract";
import AnimatedCursor from "react-animated-cursor";

// Define metadata for the document
export const metadata = {
  title: "TrotelCoin App",
  description: "Learn & earn crypto.",
};

// Define the main Document component
export default function Layout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <html lang={lang}>
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
      </head>

      {/* Use Suspense for loading fallback */}
      <Wagmi>
        <IntractParam>
          {" "}
          <Suspense fallback={<Loading />}>
            {/* Set the body class for dark mode */}
            <body
              className={`bg-white dark:bg-slate-950 ${poppins.className} antialiased`}
            >
              <div className="hidden lg:block">
                <AnimatedCursor
                  color="59, 130, 246"
                  innerSize={12}
                  innerScale={1.6}
                  outerSize={6}
                  outerScale={0.8}
                />
              </div>
              <NextTopLoader
                color="#3b82f6"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
              />
              <Banner />
              <Header />
              <main className="mx-10 lg:mx-32 my-10">{children}</main>
              <Analytics />
            </body>
          </Suspense>
        </IntractParam>
      </Wagmi>
    </html>
  );
}
