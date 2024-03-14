"use client";

import { Lang } from "@/types/types";
import React from "react";

// Define a functional component called ComingSoon
const ComingSoon = ({ lang }: { lang: Lang }) => {
  return (
    <>
      {/* Container for the "Coming Soon" message */}
      <div className="mx-auto max-w-lg mt-8">
        {/* Card with a "Coming Soon" message */}
        <div className="w-full bg-gray-100 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {/* Text displaying "Coming Soon" */}
          <span className="text-gray-900 dark:text-gray-100 animate__animated animate__flash animate__slower animate__infinite text-xl">
            {lang === "en" ? "Coming soon..." : "Prochainement..."}
          </span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
