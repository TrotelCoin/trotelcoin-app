"use client";

import { DictType, Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import { getDictionary } from "../dictionaries";
import TheAlgorithm from "@/app/[lang]/statistics/components/TheAlgorithm";

const Statistics = ({ params: { lang } }: { params: { lang: Lang } }) => {
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
      <TheAlgorithm dict={dict as DictType} lang={lang} />
    </>
  );
};

export default Statistics;
