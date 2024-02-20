import { DictType, Lang } from "@/types/types";
import React from "react";
import Link from "next/link";

const UnauthorizedContent = ({
  dict,
  lang,
}: {
  dict: DictType;
  lang: Lang;
}) => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white dark:bg-black px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            {typeof dict?.lesson !== "string" && (
              <>{dict?.lesson.notAvailable}</>
            )}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
            {typeof dict?.lesson !== "string" && (
              <>{dict?.lesson.notAvailableMessage}</>
            )}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/${lang}/home`}
              className="rounded-md bg-black dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-100 dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {typeof dict?.lesson !== "string" && (
                <>{dict?.lesson.goBackHome}</>
              )}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default UnauthorizedContent;
