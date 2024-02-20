"use client";

import React, { useEffect, useState } from "react";
import Intermediate from "@/app/[lang]/premium/components/intermediate";
import Expert from "@/app/[lang]/premium/components/expert";
import Beginner from "@/app/[lang]/premium/components/beginner";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import PremiumStatistics from "./components/premiumStatistics";

const Subscription = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  return (
    <>
      <div className="flex flex-col mx-auto">
        <h1 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
          {typeof dict?.premium !== "string" && <>{dict?.premium.claimNFTs}</>}
        </h1>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-4">
          <Beginner lang={lang} />
          <Intermediate lang={lang} />
          <Expert lang={lang} />
        </div>
        <h1 className="text-xl mt-10 text-gray-900 dark:text-gray-100 font-semibold">
          {typeof dict?.premium !== "string" && <>{dict?.premium.statistics}</>}
        </h1>
        <PremiumStatistics dict={dict as DictType} />
      </div>
    </>
  );
};

export default Subscription;
