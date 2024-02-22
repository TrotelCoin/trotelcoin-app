"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Streak from "@/app/[lang]/learn/components/streak";

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
        <Streak dict={dict as DictType} />
        <div>
          <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl mt-10">
            {lang === "en" ? <>The future</> : <>Le futur</>}
          </h2>
          <ComingSoon lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Learn;
