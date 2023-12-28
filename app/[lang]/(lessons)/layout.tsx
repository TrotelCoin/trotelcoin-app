"use client";

import React from "react";

// Define the main Document component
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-base leading-7 text-gray-700 dark:text-gray-300">
      {children}
    </div>
  );
}
