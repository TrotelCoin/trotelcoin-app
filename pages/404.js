import React from "react";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <div className="bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            It seems you get lost.
          </h2>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="./"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Go back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
