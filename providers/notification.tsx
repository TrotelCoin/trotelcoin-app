"use client";

import React from "react";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <>{children}</>
    </>
  );
};

export default NotificationProvider;
