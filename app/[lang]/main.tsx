"use client";

import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import React, { Suspense } from "react";
import GoogleAnalytics from "@/app/[lang]/googleAnalytics";
import Banner from "@/app/[lang]/ui/interface/banner";
import Footer from "@/app/[lang]/ui/interface/footer";
import Header from "@/app/[lang]/ui/interface/header";
import Loading from "@/app/[lang]/ui/interface/loading";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const MainComponent = ({
  children,
  router,
}: {
  children: React.ReactNode;
  router: AppRouterInstance;
}) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* Set the body class for dark mode */}
        <div>
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
          <Header router={router} />
          <main className="mx-10 lg:mx-auto my-10 max-w-6xl">{children}</main>
          <Footer />
          <Analytics />
        </div>
      </Suspense>
    </>
  );
};

export default MainComponent;
