"use client";

import type { Lang } from "@/types/language/lang";
import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import StakingV1 from "@/app/[lang]/stake/v1/stakingV1";
import StakingV2 from "@/app/[lang]/stake/v2/stakingV2";
import { StakingVersion } from "@/types/web3/staking";

const Staking = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [version, setVersion] = useState<string>("v2");

  return (
    <>
      <Tabs.Root
        defaultValue="v2"
        onValueChange={setVersion}
        className="mx-auto flex flex-col max-w-md justify-center w-full items-center"
      >
        <Tabs.List className="flex items-center gap-2 justify-between bg-gray-50 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 rounded-full backdrop-blur-xl p-2 w-full font-semibold text-gray-900 dark:text-gray-100">
          <Tabs.Trigger
            value={"v1" as StakingVersion}
            className={`mx-auto w-full flex items-center focus:outline-none justify-center p-2 rounded-full ${
              version === "v1"
                ? "bg-gray-900 dark:bg-gray-50 shadow-xl text-gray-100 dark:text-gray-900"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {lang === "en" ? "Version 1" : "Version 1"}
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"v2" as StakingVersion}
            className={`mx-auto w-full flex items-center focus:outline-none justify-center p-2 rounded-full ${
              version === "v2"
                ? "bg-gray-900 dark:bg-gray-50 shadow-xl text-gray-100 dark:text-gray-900"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {lang === "en" ? "Version 2" : "Version 2"}
          </Tabs.Trigger>
        </Tabs.List>
        <div className="mt-4">
          <Tabs.Content value="v1">
            <StakingV1 lang={lang} />
          </Tabs.Content>
          <Tabs.Content value="v2">
            <StakingV2 lang={lang} />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </>
  );
};

export default Staking;
