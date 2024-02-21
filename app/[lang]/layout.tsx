// Import necessary modules and components
import React from "react";
import SessionProviderComponent from "@/app/[lang]/sessionProvider";
import Wagmi from "@/app/[lang]/wagmi";
import "@/app/[lang]/globals.css";
import { Session } from "next-auth";
import RouterComponent from "@/app/[lang]/routerComponent";
import { Lang } from "@/types/types";

export const revalidate = 10; // revalidate every 10 seconds

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
      <Wagmi>
        <SessionProviderComponent session={session}>
          <RouterComponent lang={lang}>{children}</RouterComponent>
        </SessionProviderComponent>
      </Wagmi>
    </>
  );
}
