"use client";

import React from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import { Lang } from "@/types/language/lang";

const Learn = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Learn" : "Apprendre"}
        </span>

        <ComingSoon lang={lang} />
      </div>
    </>
  );
};

export default Learn;
