// Import necessary modules and components
import React from "react";
import GoHomeButton from "@/app/learn/(submodules)/goHomeButton";

// Define the main Document component
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <GoHomeButton />
        {children}
      </body>
    </html>
  );
}
