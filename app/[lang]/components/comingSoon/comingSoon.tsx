"use client";

import { loadingFlashClass } from "@/style/loading";
import type { Lang } from "@/types/language/lang";
import React from "react";

const ComingSoon = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div className="flex">
        <div className="w-full bg-white border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
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
