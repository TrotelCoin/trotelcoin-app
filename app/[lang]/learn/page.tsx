"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import { Lang } from "@/types/types";
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
        <div className="mx-auto flex justify-center items-center -mt-10">
          <div className="flex items-center text-sm justify-between gap-4 text-gray-900 dark:text-gray-100">
            <button
              onClick={() => setComponent("learn")}
              className={`px-4 py-2 rounded-full ${
                component === "learn"
                  ? "text-gray-100 dark:text-gray-900 font-semibold bg-gray-800 dark:bg-gray-100"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {lang === "en" ? <>Learn</> : <>Apprendre</>}
            </button>
            <button
              onClick={() => setComponent("vocabulary")}
              className={`px-4 py-2 rounded-full ${
                component === "vocabulary"
                  ? "text-gray-100 dark:text-gray-900 font-semibold bg-gray-800 dark:bg-gray-100"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {lang === "en" ? <>Vocabulary</> : <>Vocabulaire</>}
            </button>
          </div>
        </div>
      </div>
      {component === "learn" && (
        <div className="mt-8">
          <ComingSoon lang={lang} />
        </div>
      )}
      {component === "vocabulary" && <Vocabulary lang={lang} />}
    </>
  );
};

export default Learn;
