import { Lang } from "@/types/language/lang";
import React from "react";
import Beginner from "@/app/[lang]/premium/components/beginner";
import Expert from "@/app/[lang]/premium/components/expert";
import Intermediate from "@/app/[lang]/premium/components/intermediate";

const Premium = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {lang === "en" ? "Ranks" : "Rangs"}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Beginner lang={lang} />
            <Intermediate lang={lang} />
            <Expert lang={lang} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;
