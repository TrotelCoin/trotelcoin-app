import type { Lang } from "@/types/language/lang";
import React from "react";
import Link from "next/link";

const UnauthorizedContent = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            {lang === "en" ? "Not available" : "Non disponible"}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
            {lang === "en"
              ? "This lesson is not available yet. Please come back later."
              : "Cette lesson n'est pas encore disponible. Veuillez revenir plus tard."}
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
};

export default UnauthorizedContent;
