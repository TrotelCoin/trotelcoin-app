"use client";

import React, { useEffect, useState } from "react";
import Intermediate from "@/app/[lang]/shop/components/intermediate";
import Expert from "@/app/[lang]/shop/components/expert";
import Beginner from "@/app/[lang]/shop/components/beginner";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";

type ActiveComponent = "ranks" | "shop";

const Subscription = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [dict, setDict] = useState<DictType | null>(null);
  const [component, setComponent] = useState<ActiveComponent>("ranks");

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  return (
    <>
      <div className="mx-auto flex justify-center items-center -mt-10">
        <div className="flex items-center text-sm justify-between gap-4 text-gray-900 dark:text-gray-100">
          <button
            onClick={() => setComponent("ranks")}
            className={`px-4 py-2 rounded-full ${
              component === "ranks"
                ? "text-gray-100 dark:text-gray-900 font-semibold bg-gray-800 dark:bg-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {lang === "en" ? <>Ranks</> : <>Rangs</>}
          </button>
          <button
            onClick={() => setComponent("shop")}
            className={`px-4 py-2 rounded-full ${
              component === "shop"
                ? "text-gray-100 dark:text-gray-900 font-semibold bg-gray-800 dark:bg-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {lang === "en" ? <>Shop</> : <>Boutique</>}
          </button>
        </div>
      </div>
      {component && (
        <div className="mx-auto mt-8">
          {component === "ranks" && (
            <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-4">
              <Beginner lang={lang} />
              <Intermediate lang={lang} />
              <Expert lang={lang} />
            </div>
          )}
          {component === "shop" && (
            <ComingSoon lang={lang} dict={dict as DictType} />
          )}
        </div>
      )}
    </>
  );
};

export default Subscription;
