"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default function GoHomeButton({ lang }: { lang: Lang }) {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  return (
    <Link href={`/${lang}/home`}>
      <button className="flex border border-gray-900/10 dark:border-gray-100/10 mt-10 bg-gray-50 dark:bg-gray-900 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-yellow-500 dark:focus:border-yellow-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-lg font-semibold">
        &larr;
        <span className="ml-4">
          {typeof dict?.lesson !== "string" && <>{dict?.lesson.goBackHome}</>}
        </span>
      </button>
    </Link>
  );
}
