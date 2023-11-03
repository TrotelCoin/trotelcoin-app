// Import necessary modules and components
import React from "react";
import GoHomeButton from "@/app/learn/(submodules)/goHomeButton";
import { poppins } from "@/app/ui/fonts";

// Define the main Document component
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body
        className={`bg-white dark:bg-black ${poppins.className} antialiased`}
      >
        <GoHomeButton />
        {children}
      </body>
    </html>
  );
}
