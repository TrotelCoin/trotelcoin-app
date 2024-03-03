"use client";

import React, { useEffect, useState } from "react";

import { useUser, useAddress } from "@thirdweb-dev/react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LevelSection from "@/app/[lang]/account/components/level";
import HeaderSection from "@/app/[lang]/account/components/header";
import BadgesSection from "@/app/[lang]/account/components/badges";
import axios from "axios";

export default function Account({
  params: { lang },
}: {
  params: { lang: Lang };
}) {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const address = useAddress();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    const fetchNewLearner = async () => {
      await axios
        .post(`/api/database/postNewLearner?wallet=${address}`)
        .catch((error) => {
          console.error(error);
        });
    };

    if (address) {
      fetchNewLearner();
    }
  }, [address]);

  return (
    <>
      <div className="mx-auto">
        {address && isLoggedIn ? (
          <>
            <HeaderSection dict={dict} lang={lang} />
            <LevelSection dict={dict} />
            <BadgesSection dict={dict as DictType} lang={lang} />
          </>
        ) : (
          <>
            <p className="text-center text-gray-900 dark:text-gray-100 text-xl">
              {typeof dict?.modals !== "string" &&
                typeof dict?.modals.connectWallet !== "string" && (
                  <>{dict?.modals.connectWallet.message}</>
                )}
            </p>
          </>
        )}
      </div>
    </>
  );
}
