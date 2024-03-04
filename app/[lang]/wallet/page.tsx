"use client";

import React, { useEffect, useState } from "react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Claim from "@/app/[lang]/wallet/components/claim";
import Staking from "@/app/[lang]/wallet/components/staking";
import Send from "@/app/[lang]/wallet/components/send";
import { useChain } from "@thirdweb-dev/react";
import { polygon } from "viem/chains";
import { useSearchParams } from "next/navigation";
import Buy from "@/app/[lang]/wallet/components/buy";

type ActiveComponent = "claim" | "staking" | "send" | "buy";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");

  const [dict, setDict] = useState<DictType | null>(null);
  const [component, setComponent] = useState<ActiveComponent>("claim");
  const [chainError, setChainError] = useState<boolean>(false);

  const chain = useChain();

  useEffect(() => {
    if (chain && chain.chainId === polygon.id) {
      setChainError(false);
    } else {
      setChainError(true);
    }
  }, [chain]);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  useEffect(() => {
    if (category) {
      setComponent(category as ActiveComponent);
    } else {
      setComponent("buy");
    }
  }, [category]);

  return (
    <>
      <div className="mx-auto flex justify-center items-center -mt-10">
        <div className="flex items-center text-sm justify-between gap-4 text-gray-900 dark:text-gray-100">
          <button
            onClick={() => setComponent("buy")}
            className={`px-4 py-2 rounded-full ${
              component === "buy"
                ? "text-gray-100 dark:text-gray-900 font-semibold bg-gray-800 dark:bg-gray-100"
                : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {lang === "en" ? <>Buy</> : <>Acheter</>}
          </button>
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
            {lang === "en" ? <>Stake</> : <>Stake</>}
          </button>
        </div>
      </div>
      {component && (
        <div className="mx-auto max-w-md mt-8">
          {component === "buy" && <Buy lang={lang} />}
          {component === "claim" && (
            <Claim
              lang={lang}
              chainError={chainError}
              setChainError={setChainError}
            />
          )}
          {component === "send" && (
            <Send
              lang={lang}
              chainError={chainError}
              setChainError={setChainError}
            />
          )}
          {component === "staking" && (
            <Staking
              lang={lang}
              chainError={chainError}
              setChainError={setChainError}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Page;
