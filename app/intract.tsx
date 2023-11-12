"use client";

import React, { useEffect } from "react";
import Intract from "@intract/attribution";

export default function IntractParam({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Intract("65514b2133cc877278448066", {
      configCollectorUrl: undefined,
      useLocalStorage: undefined,
      maxLocalStorageQueueSize: undefined,
      configVisitorCookieTimeout: undefined,
      configSessionCookieTimeout: undefined,
      loggerLevel: undefined,
      configAllowCookie: true,
      useMetamask: undefined,
    });
  }, []);
  return <>{children}</>;
}
