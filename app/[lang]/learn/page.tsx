"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

const Learn = ({ params: { lang } }: { params: { lang: Lang } }) => {
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
      <div className="mx-auto">
        <ComingSoon lang={lang} dict={dict as DictType} />
      </div>
    </>
  );
};

export default Learn;
