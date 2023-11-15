"use client";

import React from "react";
import Link from "next/link";

export default function GoHomeButton() {
  return (
    <Link href="/home">
      <button className="flex border border-gray-900/10 dark:border-gray-100/10 mt-10 bg-gray-50 dark:bg-slate-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-600 dark:focus:border-blue-200 dark:hover-bg-blue-50 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold">
        &larr;<span className="ml-4">Go back</span>
      </button>
    </Link>
  );
}
