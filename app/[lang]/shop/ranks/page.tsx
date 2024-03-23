import { Lang } from "@/types/lang";
import React from "react";
import Beginner from "@/app/[lang]/shop/components/beginner";
import Intermediate from "@/app/[lang]/shop/components/intermediate";
import Expert from "@/app/[lang]/shop/components/expert";

const Rank = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto flex flex-col gap-4">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Ranks" : "Rangs"}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Beginner lang={lang} />
          <Intermediate lang={lang} />
          <Expert lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Rank;
