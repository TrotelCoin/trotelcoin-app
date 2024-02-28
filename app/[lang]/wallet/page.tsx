"use client";

import React, { useEffect, useState } from "react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Claim from "@/app/[lang]/wallet/components/claim";
import Staking from "@/app/[lang]/wallet/components/staking";
import Send from "@/app/[lang]/wallet/components/send";

type ActiveComponent = "claim" | "staking" | "send";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [dict, setDict] = useState<DictType | null>(null);
  const [component, setComponent] = useState<ActiveComponent>("claim");

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
            onClick={() => setComponent("claim")}
            className={`px-4 py-2 rounded-full ${
              component === "claim"
                ? "text-gray-100 dark:text-gray-900 font-semibold bg-gray-800 dark:bg-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {lang === "en" ? <>Claim</> : <>Réclamer</>}
          </button>
          <button
            onClick={() => setComponent("send")}
            className={`px-4 py-2 rounded-full ${
              component === "send"
                ? "text-gray-100 dark:text-gray-900 font-semibold bg-gray-800 dark:bg-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {lang === "en" ? <>Send</> : <>Envoyer</>}
          </button>
          <button
            onClick={() => setComponent("staking")}
            className={`px-4 py-2 rounded-full ${
              component === "staking"
                ? "text-gray-100 dark:text-gray-900 font-semibold bg-gray-800 dark:bg-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {lang === "en" ? <>Staking</> : <>Staking</>}
          </button>
        </div>
      </div>
      {component && (
        <div className="mx-auto max-w-md mt-8">
          {component === "claim" && <Claim lang={lang} />}
          {component === "send" && <Send lang={lang} />}
          {component === "staking" && <Staking lang={lang} />}
        </div>
      )}
    </>
  );
};

export default Page;
