"use client";

import React from "react";
import Link from "next/link";

export default function GoHomeButton() {
  return (
    <Link href="/learn">
      <button className="flex mt-10 bg-blue-200 dark:hover:bg-blue-200/80 hover:bg-blue-200/80 dark:hover-bg-blue-50 text-sm px-6 py-2 dark:bg-blue-200 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold">
        &larr;<span className="ml-4">Go back</span>
      </button>
    </Link>
  );
}
