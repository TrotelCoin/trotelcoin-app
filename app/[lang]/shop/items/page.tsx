"use client";

import React from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import { Lang } from "@/types/lang";

const Shop = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto max-w-md flex flex-col gap-4">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Shop" : "Boutique"}
        </span>
        <ComingSoon lang={lang} />
      </div>
    </>
  );
};

export default Shop;
