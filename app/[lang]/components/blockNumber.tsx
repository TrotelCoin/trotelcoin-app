"use client";

import React, { useContext } from "react";
import { useBlockNumber } from "wagmi";
import { loadingFlashClass } from "@/style/loading";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Lang } from "@/types/language/lang";
import ChainContext from "@/contexts/chain";

const BlockNumber = ({ lang }: { lang: Lang }) => {
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    chainId: chain.id,
    watch: true
  });

  return (
    <>
      {blockNumber && (
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger className="cursor-help" asChild>
              <div
                className={`fixed bottom-0 right-0 mb-5 mr-5 hidden items-center gap-1 text-xs text-blue-500 dark:text-blue-300 lg:flex`}
              >
                {Number(blockNumber).toLocaleString("en-US")}
                <div
                  className={`h-2 w-2 rounded-full bg-blue-500 ${loadingFlashClass}`}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content sideOffset={5} side="left" align="center">
                <div className="rounded-xl bg-blue-500 p-2 text-xs text-gray-100 shadow-lg backdrop-blur-xl">
                  {lang === "en"
                    ? `Current block number on ${chain.name}`
                    : `Numéro de bloc actuel sur ${chain.name}`}
                </div>
                <Tooltip.Arrow className="fill-blue-500" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </>
  );
};

export default BlockNumber;
