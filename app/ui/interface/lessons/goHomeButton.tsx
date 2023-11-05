"use client";

import React from "react";
import Link from "next/link";

export default function GoHomeButton() {
  return (
    <Link href="/">
      <button className="flex mt-10 bg-gray-50 dark:bg-gray-900 hover:shadow focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-900 rounded-lg font-semibold">
        &larr;<span className="ml-4">Go back</span>
      </button>
    </Link>
  );
}
