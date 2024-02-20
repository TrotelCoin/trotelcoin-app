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
      <div className="mx-auto max-w-6xl mt-4">
        {/* Card with a "Coming Soon" message */}
        <div className="w-full bg-gray-50 border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* Text displaying "Coming Soon" */}
          <span className="text-gray-900 dark:text-gray-100 animate__animated animate__flash animate__slower animate__infinite text-xl">
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
