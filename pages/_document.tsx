import React, { Suspense } from "react";
import Loading from "../components/stateless/loading";
import { Html, Head, Main, NextScript } from "next/document";

// Define metadata for the document
export const metadata = {
  title: "TrotelCoin App",
  description: "Learn & earn crypto.",
};

// Define the main Document component
export default function Document() {
  return (
    <Html>
      <Head>
        {/* Set metadata for SEO */}
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/logo/trotelcoin.png"></link>

        {/* Define Apple splash screen images for different devices */}
        <link
          href="/pwa-splash/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        {/* Repeat similar 'link' elements for other devices */}

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>

        {/* Include Google Fonts styles */}
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&family=Mooli&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      {/* Use Suspense for loading fallback */}
      <Suspense fallback={<Loading></Loading>}>
        {/* Set the body class for dark mode */}
        <body className="dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Suspense>
    </Html>
  );
}
