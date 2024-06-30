"use client";

import React from "react";
import Link from "next/link";
import type { Lang } from "@/types/language/lang";

export default function GoHomeButton({ lang }: { lang: Lang }) {
  return (
    <Link href={`/${lang}/home`}>
      <button className="flex rounded-xl border border-gray-900/10 bg-white px-6 py-2 text-sm font-semibold text-gray-900 hover:border-gray-900/50 hover:shadow focus:border-blue-500 focus:shadow-none dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-100/50 dark:focus:border-blue-300">
        &larr;
        <span className="ml-4">
          {lang === "en" ? "Go back home" : "Retourner à l'accueil"}
        </span>
      </button>
    </Link>
  );
}
