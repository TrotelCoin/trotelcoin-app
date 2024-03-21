"use client";

import React, { useEffect, useState } from "react";
import Intermediate from "@/app/[lang]/shop/components/intermediate";
import Expert from "@/app/[lang]/shop/components/expert";
import Beginner from "@/app/[lang]/shop/components/beginner";
import type { Lang } from "@/types/lang";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import { useSearchParams } from "next/navigation";

type ActiveComponent = "ranks" | "shop" | "inventory";

const Subscription = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");

  const [component, setComponent] = useState<ActiveComponent>("ranks");

  useEffect(() => {
    if (category) {
      setComponent(category as ActiveComponent);
    } else {
      setComponent("ranks");
    }
  }, [category]);

  return (
    <>
      <div className="mx-auto flex justify-start items-center">
        <div className="flex items-center text-sm justify-between gap-2 text-gray-900 dark:text-gray-100">
          <button
            onClick={() => setComponent("ranks")}
            className={`px-4 py-2 rounded-full font-semibold ${
              component === "ranks"
              ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-200 dark:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10"
              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-transparent"
            }`}
          >
            {lang === "en" ? <>Ranks</> : <>Rangs</>}
          </button>
          <button
            onClick={() => setComponent("shop")}
            className={`px-4 py-2 rounded-full font-semibold ${
              component === "shop"
              ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-200 dark:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10"
              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-transparent"
            }`}
          >
            {lang === "en" ? <>Shop</> : <>Boutique</>}
          </button>
          <button
            onClick={() => setComponent("inventory")}
            className={`px-4 py-2 rounded-full font-semibold ${
              component === "inventory"
              ? "text-gray-900 dark:text-gray-100 font-semibold bg-gray-200 dark:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10"
              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-transparent"
            }`}
          >
            {lang === "en" ? <>Inventory</> : <>Inventaire</>}
          </button>
        </div>
      </div>
      {component && (
        <div className="mx-auto mt-2">
          {component === "ranks" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Beginner lang={lang} />
              <Intermediate lang={lang} />
              <Expert lang={lang} />
            </div>
          )}
          {component === "shop" && <ComingSoon lang={lang} />}
          {component === "inventory" && <ComingSoon lang={lang} />}
        </div>
      )}
    </>
  );
};

export default Subscription;
