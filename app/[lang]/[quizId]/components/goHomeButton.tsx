"use client";

import React from "react";
import Link from "next/link";
import type { Lang } from "@/types/lang";

export default function GoHomeButton({ lang }: { lang: Lang }) {
  return (
    <Link href={`/${lang}/home`}>
      <button className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-800 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-xl font-semibold">
        &larr;
        <span className="ml-4">
          {lang === "en" ? "Go back home" : "Retourner à l'accueil"}
        </span>
      </button>
    </Link>
  );
}
