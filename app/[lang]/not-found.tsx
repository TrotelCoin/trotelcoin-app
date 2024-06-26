import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 dark:bg-gray-900 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/en/home`}
              className="rounded-xl bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:focus-visible:outline-blue-300"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
