"use client";

import React, { useEffect, useState } from "react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Claim from "@/app/[lang]/wallet/components/claim";
import Staking from "@/app/[lang]/wallet/components/staking";
import SendAndReceive from "@/app/[lang]/wallet/components/sendAndReceive";

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
          <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl mt-10">
            {lang === "en" ? <>Wallet</> : <>Portefeuille</>}
          </h2>
          <Claim lang={lang} />
          <SendAndReceive lang={lang} />
        </div>

        <div>
          <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl mt-10">
            {lang === "en" ? <>Staking</> : <>Staking</>}
          </h2>
          <Staking lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Page;
