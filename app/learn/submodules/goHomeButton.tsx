"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function GoHomeButton() {
  const router = useRouter();

  return (
    <button
      className="absolute top-5 left-5 bg-blue-200 dark:hover:bg-blue-200/80 hover:bg-blue-200/80 dark:hover-bg-blue-50 text-sm px-6 py-2 dark:bg-blue-200 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold"
      onClick={() => router.push("/learn")}
    >
      &larr;<span className="ml-4">Go back</span>
    </button>
  );
}
