import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white dark:bg-black px-6 py-48 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-yellow-500 dark:text-yellow-300">
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
              className="rounded-md bg-yellow-500 dark:bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-100 dark:text-gray-900 shadow-sm hover:bg-yellow-700 dark:hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
