"use client";

import React, { useEffect, useState } from "react";
import Intermediate from "@/app/[lang]/shop/components/intermediate";
import Expert from "@/app/[lang]/shop/components/expert";
import Beginner from "@/app/[lang]/shop/components/beginner";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

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
        <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-4">
          <Beginner lang={lang} />
          <Intermediate lang={lang} />
          <Expert lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Subscription;
