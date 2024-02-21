"use client";

import React, { useEffect, useState } from "react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Claim from "@/app/[lang]/wallet/components/claim";
import Staking from "@/app/[lang]/wallet/components/staking";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
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
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Claim lang={lang} />
        </div>
        <div>
          <Staking lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Page;
