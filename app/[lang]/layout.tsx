import React, { Suspense } from "react";
import SessionProviderComponent from "@/providers/session";
import "@/app/[lang]/globals.css";
import { Session } from "next-auth";
import type { Lang } from "@/types/language/lang";
import type { Metadata } from "next";
import Script from "next/script";
import { Theme } from "@radix-ui/themes";
import { poppins } from "@/utils/fonts/poppins";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import Banner from "@/app/[lang]/components/banner/banner";
import Footer from "@/app/[lang]/components/navigation/footer";
import Header from "@/app/[lang]/components/navigation/header";
import Loading from "@/app/[lang]/components/loading";
import GoogleAnalytics from "@/app/[lang]/googleAnalytics";
import LifeProvider from "@/providers/life";
import MobileFooter from "@/app/[lang]/components/mobile/footer";
import StreakProvider from "@/providers/streak";
import PremiumProvider from "@/providers/premium";
import UserProvider from "@/providers/user";
import ThemeProvider from "@/providers/theme";
import AudioProvider from "@/providers/audio";
import LanguageProvider from "@/providers/language";
import Web3ModalProvider from "@/contexts/web3Modal";
import { NextUIProvider } from "@nextui-org/react";
import "swiper/css";
import "animate.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@radix-ui/themes/styles.css";
import BlockNumber from "@/app/[lang]/components/blockNumber";
import NotificationProvider from "@/providers/notification";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config/Web3ModalConfig";
import { headers } from "next/headers";
import Waitlist from "@/app/[lang]/components/waitlist/waitlist";
import { refreshIntervalTime } from "@/utils/axios/fetcher";
import TrotelPriceProvider from "@/providers/trotelPrice";
import ChainProvider from "@/providers/chain";

export const metadata: Metadata = {
  title: "TrotelCoin App",
  description:
    "TrotelCoin, a web3 platform, facilitates connecting, attracting, and retaining users through interactive experiences. Join a community exploring crypto daily through Quests, Streaks, Activities, and beyond.",
  generator: "Next.js",
  manifest: "/manifest.json",
  appleWebApp: true,
  keywords:
    "trotelcoin, learn, earn, learn & earn, crypto, bitcoin, ethereum, trotelcoin app, trotelcoin.com, trotelcoin app, trotelcoin app",
  authors: [{ name: "TrotelCoin" }],
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
        url: "https://app.trotelcoin.com/assets/banner/trotelcoin-banner.png",
        width: 800,
        height: 600,
        alt: "TrotelCoin App"
      }
    ]
  },
  twitter: {
    card: "summary",
    site: "@trotelcoin",
    creator: "@trotelcoin",
    title: "TrotelCoin App"
  }
};

export const jsonLd = {
  "@context": "https://app.trotelcoin.com/",
  "@type": "Product",
  name: "TrotelCoin",
  image: "/assets/banner/trotelcoin-banner.png",
  description:
    "TrotelCoin, a web3 platform, facilitates connecting, attracting, and retaining users through interactive experiences. Join a community exploring crypto daily through Quests, Streaks, Activities, and beyond."
};

export const revalidate = refreshIntervalTime;

export default function Layout({
  session,
  children,
  params: { lang }
}: {
  session: Session;
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <>
      <html lang={lang}>
        <head>
          <link
            rel="apple-touch-icon"
            href="/assets/logo/trotelcoin.png"
            as="image"
          />
          <link rel="icon" href="/favicon.ico" sizes="any" as="icon" />
          <Script id="hotjar" strategy="lazyOnload">
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

        <body
          className={`bg-white dark:bg-gray-900 ${poppins.className} antialiased`}
        >
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}
          <NextTopLoader
            color="#3b82f6"
            initialPosition={0.08}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
          />
          <NextUIProvider>
            <Theme hasBackground={false}>
              <ThemeProvider>
                <AudioProvider>
                  <Web3ModalProvider initialState={initialState}>
                    <SessionProviderComponent session={session}>
                      <ChainProvider>
                        <TrotelPriceProvider>
                          <PremiumProvider>
                            <UserProvider lang={lang}>
                              <LifeProvider lang={lang}>
                                <StreakProvider lang={lang}>
                                  <LanguageProvider>
                                    <NotificationProvider>
                                      <Suspense
                                        fallback={<Loading lang={lang} />}
                                      >
                                        <Banner lang={lang} />
                                        <Header lang={lang} />

                                        <main className="lg:py-18 max-w-5xl px-4 py-12 lg:mx-auto lg:px-8">
                                          {children}
                                        </main>

                                        <Footer lang={lang} />
                                        <MobileFooter lang={lang} />
                                        <BlockNumber lang={lang} />
                                      </Suspense>
                                    </NotificationProvider>
                                  </LanguageProvider>
                                </StreakProvider>
                              </LifeProvider>
                            </UserProvider>
                          </PremiumProvider>
                        </TrotelPriceProvider>
                      </ChainProvider>
                    </SessionProviderComponent>
                  </Web3ModalProvider>
                </AudioProvider>
              </ThemeProvider>
            </Theme>
          </NextUIProvider>
          <Analytics />
          <SpeedInsights />
        </body>

        <Script
          id="json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "b7c8bd3de82644159e2a34e96da6037d"}'
        />
      </html>
    </>
  );
}
