"use client";

import { DictType, Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";

// Define a functional component called ComingSoon
const ComingSoon = ({ lang }: { lang: Lang }) => {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  return (
    <>
      {/* Container for the "Coming Soon" message */}
      <div className="mx-auto max-w-6xl mt-4 mb-20">
        {/* Card with a "Coming Soon" message */}
        <div className="w-full bg-gray-50 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* Text displaying "Coming Soon" */}
          <span className="text-gray-900 dark:text-gray-100 animate-pulse text-xl">
            {typeof dict?.comingSoon !== "string" && (
              <>{dict?.comingSoon.comingSoon}</>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
