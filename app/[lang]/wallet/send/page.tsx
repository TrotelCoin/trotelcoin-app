"use client";

import { Lang } from "@/types/lang";
import React from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";

const Send = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto max-w-md flex flex-col gap-4">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Send" : "Envoyer"}
        </span>

        <ComingSoon lang={lang} />
      </div>
    </>
  );
};

export default Send;
