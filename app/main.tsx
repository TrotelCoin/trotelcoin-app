import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import React, { Component, Suspense, useEffect } from "react";
import GoogleAnalytics from "./googleAnalytics";
import { poppins } from "@/app/ui/fonts";
import Banner from "@/app/ui/interface/banner";
import Footer from "@/app/ui/interface/footer";
import Header from "@/app/ui/interface/header";
import Loading from "@/app/ui/interface/loading";
import Fail from "@/app/ui/modals/fail";
import { useNetwork } from "wagmi";
import { polygon } from "viem/chains";

const MainComponent = ({ children }: { children: React.ReactNode }) => {
  const [isSupportedChain, setIsSupportedChain] =
    React.useState<boolean>(false);

  const { chain } = useNetwork();

  useEffect(() => {
    if (chain?.id === polygon.id) {
      setIsSupportedChain(true);
    }
  }, [chain?.id]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* Set the body class for dark mode */}
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
          <main className="mx-10 lg:mx-auto my-10 max-w-6xl">{children}</main>
          <Footer />
          <Analytics />
          <Fail
            show={!isSupportedChain}
            onClose={() => setIsSupportedChain(true)}
            message="Switch to Polygon."
            title="Wrong network!"
          />
        </body>
      </Suspense>
    </>
  );
};

export default MainComponent;
