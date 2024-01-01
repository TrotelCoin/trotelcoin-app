import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import React, { Suspense } from "react";
import GoogleAnalytics from "@/app/[lang]/googleAnalytics";
import Banner from "@/app/[lang]/ui/interface/banner";
import Footer from "@/app/[lang]/ui/interface/footer";
import Header from "@/app/[lang]/ui/interface/header";
import Loading from "@/app/[lang]/ui/interface/loading";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Lang } from "@/types/types";
import Events from "@/app/[lang]/components/events";
import { poppins } from "@/app/[lang]/ui/fonts";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DictionaryProvider } from "@/app/[lang]/dictionnaryProvider";

export const metadata = {
  title: "TrotelCoin App",
  description: "Learn & earn crypto.",
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
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
          />
          <Suspense fallback={<Loading />}>
            <DictionaryProvider lang={lang}>
              <Banner lang={lang} />
              <Header router={router} lang={lang} />
              <main className="mx-10 lg:mx-auto my-10 max-w-4xl">
                {children}
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
