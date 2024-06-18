"use client";

import type { Lang } from "@/types/language/lang";
import React, { useState, useContext } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import StakingV1 from "@/app/[lang]/stake/v1/stakingV1";
import StakingV2 from "@/app/[lang]/stake/v2/stakingV2";
import { StakingVersion } from "@/types/web3/staking";
import { roundPrice } from "@/utils/price/roundPrice";
import TrotelPriceContext from "@/contexts/trotelPrice";

const Staking = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [version, setVersion] = useState<string>("v2");

  const { trotelPrice, showTrotelInUsdc, storedTrotelPrice } =
    useContext(TrotelPriceContext);

  return (
    <>
      <Tabs.Root
        defaultValue="v2"
        onValueChange={setVersion}
        className="mx-auto flex w-full max-w-md flex-col items-center justify-center"
      >
        <Tabs.List className="flex w-full items-center justify-between gap-2 rounded-full border border-gray-900/10 bg-white p-2 font-semibold text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <Tabs.Trigger
            value={"v1" as StakingVersion}
            className={`mx-auto flex w-full items-center justify-center rounded-full p-2 focus:outline-none ${
              version === "v1"
                ? "bg-gray-900 text-gray-100 shadow-xl dark:bg-white dark:text-gray-900"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {lang === "en" ? "Version 1" : "Version 1"}
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"v2" as StakingVersion}
            className={`mx-auto flex w-full items-center justify-center rounded-full p-2 focus:outline-none ${
              version === "v2"
                ? "bg-gray-900 text-gray-100 shadow-xl dark:bg-white dark:text-gray-900"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {lang === "en" ? "Version 2" : "Version 2"}
          </Tabs.Trigger>
        </Tabs.List>
        <div className="mt-4">
          <Tabs.Content value="v1">
            <StakingV1
              lang={lang}
              trotelPrice={trotelPrice as number}
              showTrotelInUsdc={showTrotelInUsdc}
              storedTrotelPrice={storedTrotelPrice as number}
            />
          </Tabs.Content>
          <Tabs.Content value="v2">
            <StakingV2
              lang={lang}
              trotelPrice={trotelPrice as number}
              showTrotelInUsdc={showTrotelInUsdc}
              storedTrotelPrice={storedTrotelPrice as number}
            />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </>
  );
};

export default Staking;
