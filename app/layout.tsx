// Import necessary modules and components

import React, { Suspense } from "react";
import "@/app/globals.css";
import NextTopLoader from "nextjs-toploader";
import Loading from "@/app/ui/interface/loading";
import { poppins } from "@/app/ui/fonts";
import Wagmi from "@/app/wagmi";
import Header from "@/app/ui/interface/header";
import Footer from "@/app/ui/interface/footer";
import Banner from "@/app/ui/interface/banner";
import { Analytics } from "@vercel/analytics/react";
import IntractParam from "@/app/intract";
import GoogleAnalytics from "@/app/googleAnalytics";
import Script from "next/script";

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
        <IntractParam>
          {" "}
          <Suspense fallback={<Loading />}>
            {/* Set the body class for dark mode */}
            <body
              className={`bg-white dark:bg-black ${poppins.className} antialiased`}
            >
              {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
                <GoogleAnalytics
                  ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
                />
              ) : null}
              <div className="hidden lg:block">
                {/*<AnimatedCursor
                  color="59, 130, 246"
                  innerSize={24}
                  innerScale={0.5}
                  outerSize={24}
                  outerScale={2}
                  showSystemCursor={false}
                />*/}
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
              <main className="mx-10 lg:mx-auto my-10 max-w-6xl">
                {children}
              </main>
              <Footer />
              <Analytics />
            </body>
          </Suspense>
        </IntractParam>
      </Wagmi>
    </html>
  );
}
