import React, { Suspense } from "react";
import SessionProviderComponent from "@/app/[lang]/providers/sessionProvider";
import Wagmi from "@/app/[lang]/wagmi";
import "@/app/[lang]/globals.css";
import { Session } from "next-auth";
import { Lang } from "@/types/types";
import type { Metadata } from "next";
import Script from "next/script";
import { poppins } from "@/lib/fonts/poppins";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import Banner from "@/app/[lang]/components/banner/banner";
import Changelogs from "@/app/[lang]/components/changelogs/changelogs";
import Footer from "@/app/[lang]/components/footer";
import Header from "@/app/[lang]/components/header";
import Loading from "@/app/[lang]/components/loading";
import GoogleAnalytics from "@/app/[lang]/googleAnalytics";
import LifeProvider from "@/app/[lang]/providers/lifeProvider";
import MobileFooter from "@/app/[lang]/components/mobileFooter";
import StreakProvider from "@/app/[lang]/providers/streakProvider";
import PremiumProvider from "@/app/[lang]/providers/premiumProvider";
import UserProvider from "@/app/[lang]/providers/userProvider";
import ThemeProvider from "@/app/[lang]/providers/themeProvider";
import AudioProvider from "@/app/[lang]/providers/audioProvider";
import LanguageProvider from "@/app/[lang]/providers/languageProvider";
import Web3ModalProvider from "@/app/[lang]/contexts/Web3ModalContext";
import { config } from "@/config/Web3ModalConfig";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import "swiper/css";
import "animate.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const metadata: Metadata = {
  title: "TrotelCoin App",
  description:
    "TrotelCoin, a web3 platform, facilitates connecting, attracting, and retaining users through interactive experiences. Join a community exploring crypto daily through Quests, Streaks, Activities, and beyond.",
  generator: "Next.js",
  manifest: "/manifest.json",
  appleWebApp: true,
  keywords:
    "trotelcoin, learn, earn, crypto, bitcoin, ethereum, trotelcoin app, trotelcoin.com, trotelcoin app, trotelcoin app",
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
        url: "/assets/banner/trotelcoin-banner.png",
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

export const jsonLd = {
  "@context": "https://app.trotelcoin.com/",
  "@type": "Product",
  name: "TrotelCoin",
  image: "/assets/banner/trotelcoin-banner.png",
  description:
    "TrotelCoin, a web3 platform, facilitates connecting, attracting, and retaining users through interactive experiences. Join a community exploring crypto daily through Quests, Streaks, Activities, and beyond.",
};

const initialState = cookieToInitialState(config, headers().get("cookie"));

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
          <Wagmi>
            <Web3ModalProvider initialState={initialState}>
              <SessionProviderComponent session={session}>
                <UserProvider lang={lang}>
                  <PremiumProvider>
                    <LifeProvider lang={lang}>
                      <StreakProvider lang={lang}>
                        <LanguageProvider>
                          <ThemeProvider>
                            <AudioProvider>
                              <Suspense fallback={<Loading lang={lang} />}>
                                <Banner lang={lang} />
                                <Changelogs lang={lang} />
                                <Header lang={lang} />
                                <main className="px-6 lg:px-8 lg:mx-auto py-6 lg:py-8 max-w-5xl my-10">
                                  {children}
                                </main>
                                <Footer lang={lang} />
                                <MobileFooter lang={lang} />
                              </Suspense>
                            </AudioProvider>
                          </ThemeProvider>
                        </LanguageProvider>
                      </StreakProvider>
                    </LifeProvider>
                  </PremiumProvider>
                </UserProvider>{" "}
              </SessionProviderComponent>
            </Web3ModalProvider>
          </Wagmi>

          <Analytics />
          <SpeedInsights />
        </body>

        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </html>
    </>
  );
}
