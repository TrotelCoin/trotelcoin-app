"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import type { Lang } from "@/types/lang";
import Vocabulary from "@/app/[lang]/learn/components/vocabulary";
import { useSearchParams } from "next/navigation";

type ActiveComponent = "learn" | "vocabulary";

const Learn = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");

  const [component, setComponent] = useState<ActiveComponent>("learn");

  useEffect(() => {
    if (category) {
      setComponent(category as ActiveComponent);
    } else {
      setComponent("learn");
    }
  }, [category]);

  return (
    <>
      <div className="mx-auto">
        <div className="mx-auto flex justify-center items-center">
          <div className="flex items-center text-sm justify-between gap-4 text-gray-900 dark:text-gray-100">
            <button
              onClick={() => setComponent("learn")}
              className={`px-4 py-2 rounded-full font-semibold ${
                component === "learn"
                  ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-200 dark:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {lang === "en" ? <>Learn</> : <>Apprendre</>}
            </button>
            <button
              onClick={() => setComponent("vocabulary")}
              className={`px-4 py-2 rounded-full font-semibold ${
                component === "vocabulary"
                  ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-200 dark:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {lang === "en" ? <>Vocabulary</> : <>Vocabulaire</>}
            </button>
          </div>
        </div>
      </div>
      {component === "learn" && (
        <div className="mt-4">
          <ComingSoon lang={lang} />
        </div>
      )}
      {component === "vocabulary" && <Vocabulary lang={lang} />}
    </>
  );
};

export default Learn;
