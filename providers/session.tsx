"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function SessionProviderComponent({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  try {
    return <SessionProvider session={session}>{children}</SessionProvider>;
  } catch (error) {
    console.error("Error in SessionProvider component:", error);
    return <body>Error occurred. Please try again.</body>;
  }
}
