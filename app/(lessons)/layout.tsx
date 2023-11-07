// Import necessary modules and components
import React from "react";
import GoHomeButton from "@/app/ui/interface/lessons/goHomeButton";

// Define the main Document component
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-base leading-7 text-stone-700 dark:text-stone-300">
      {children}
      <GoHomeButton />
    </div>
  );
}
