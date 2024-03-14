"use client";

import { Lang } from "@/types/types";
import Link from "next/link";

export default function NotPremium({
  params: { lang },
}: {
  params: { lang: Lang };
}) {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            {lang === "en" ? "Not premium" : "Non premium"}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
            {lang === "en"
              ? "Become premium to access this course."
              : "Devenez premium pour accéder à ce cours."}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/${lang}/home`}
              className="rounded-xl bg-gray-900 dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-100 dark:text-gray-900 shadow-sm hover:bg-gray-700 dark:hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-300"
            >
              {lang === "en" ? "Go back home" : "Retourner à l'accueil"}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
