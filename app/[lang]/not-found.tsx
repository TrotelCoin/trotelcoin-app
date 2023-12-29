import React from "react";
import Link from "next/link";
import { Lang } from "@/types/types";

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white dark:bg-black px-6 py-72 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600 dark:text-blue-200">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/en/home`}
              className="rounded-md bg-blue-600 dark:bg-blue-200 px-3.5 py-2.5 text-sm font-semibold text-gray-100 dark:text-gray-900 shadow-sm hover:bg-blue-800 dark:hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
