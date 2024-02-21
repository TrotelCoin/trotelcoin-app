import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import React, { Suspense, useEffect, useMemo } from "react";
import GoogleAnalytics from "@/app/[lang]/googleAnalytics";
import Banner from "@/app/[lang]/components/banner";
import Footer from "@/app/[lang]/components/footer";
import Header from "@/app/[lang]/components/header";
import Loading from "@/app/[lang]/components/loading";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Lang } from "@/types/types";
import Events from "@/app/[lang]/components/events";
import { poppins } from "@/lib/fonts/poppins";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DictionaryProvider } from "@/app/[lang]/dictionnaryProvider";
import Changelogs from "@/app/[lang]/components/changelogs";
import { useAccount } from "wagmi";
import LifeContext from "@/app/[lang]/lifeProvider";

export const metadata = {
  title: "TrotelCoin App",
  description: "Learn & earn crypto.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: "trotelcoin, learn, earn, crypto, bitcoin, ethereum",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", content: "#000" },
    { media: "(prefers-color-scheme: light)", content: "#fff" },
  ],
  authors: "TrotelCoin",
  viewport: "width=device-width, initial-scale=1",
  icons: [
    {
      href: "/assets/logo/trotelcoin.png",
      sizes: "any",
      type: "image/png",
    },
  ],
};

const MainComponent = ({
  children,
  router,
  lang,
}: {
  children: React.ReactNode;
  router: AppRouterInstance;
  lang: Lang;
}) => {
  const [life, setLife] = React.useState<number>(0);

  const { address } = useAccount();

  const updateLife = async () => {
    await fetch(`/api/database/updateLife?wallet=${address}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    setLife(life - 1);
  };

  useEffect(() => {
    const fetchUserLife = async () => {
      await fetch(`/api/database/life?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          setLife(data);
        });
    };

    if (address) {
      fetchUserLife();

      const interval = setInterval(fetchUserLife, 10000);

      return () => clearInterval(interval);
    } else {
      setLife(3);
    }
  }, [address]);

  const contextValue = useMemo(
    () => ({ updateLife, life, setLife }),
    [updateLife, life, setLife]
  );

  return (
    <>
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
          <link rel="icon" href="/favicon.ico" sizes="any" />
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

        <body
          className={`bg-white dark:bg-black ${poppins.className} antialiased`}
        >
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
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
            color="#eab308"
            initialPosition={0.08}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #F5AD3B,0 0 5px #F5AD3B"
          />
          <Suspense fallback={<Loading />}>
            <DictionaryProvider lang={lang}>
              <Banner lang={lang} />
              <Changelogs lang={lang} />
              <Header router={router} lang={lang} life={life} />
              <main className="px-6 lg:px-8 lg:mx-auto py-6 lg:py-8 max-w-6xl my-10">
                <LifeContext.Provider value={contextValue}>
                  {children}
                </LifeContext.Provider>
              </main>
              <Footer lang={lang} />
              <Events lang={lang} />
            </DictionaryProvider>
          </Suspense>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
};

export default MainComponent;
