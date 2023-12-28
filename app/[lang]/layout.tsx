// Import necessary modules and components

import React from "react";
import SessionProviderComponent from "@/app/[lang]/sessionProvider";
import Wagmi from "@/app/[lang]/wagmi";
import { Session } from "next-auth";
import RouterComponent from "@/app/[lang]/routerComponent";

export default function Layout({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Use Suspense for loading fallback */}
      <Wagmi>
        <SessionProviderComponent session={session}>
          <RouterComponent children={children} />
        </SessionProviderComponent>
      </Wagmi>
    </>
  );
}
