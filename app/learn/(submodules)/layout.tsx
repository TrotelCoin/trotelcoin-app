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
        <div className="bg-white dark:bg-black px-6 py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
            {children}
            <GoHomeButton />
          </div>
        </div>
      </body>
    </html>
  );
}
