"use client";

import { loadingFlashClass } from "@/style/loading";
import type { Lang } from "@/types/language/lang";
import React from "react";

const ComingSoon = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div className="flex">
        <div className="w-full rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <span
            className={`text-gray-900 dark:text-gray-100 ${loadingFlashClass} text-xl`}
          >
            {lang === "en" ? "Coming soon..." : "Prochainement..."}
          </span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
