"use client";

import { DictType, Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";

// Define a functional component called ComingSoon
const ComingSoon = ({ lang, dict }: { lang: Lang; dict: DictType }) => {
  return (
    <>
      {/* Container for the "Coming Soon" message */}
      <div className="mx-auto max-w-lg mt-4">
        {/* Card with a "Coming Soon" message */}
        <div className="w-full bg-gray-100 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
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
