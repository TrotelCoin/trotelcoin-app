"use client";

import React from "react";
import { polygon } from "viem/chains";
import { useBlockNumber } from "wagmi";
import { loadingFlashClass } from "@/utils/tailwind/loading";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Lang } from "@/types/lang";

const BlockNumber = ({ lang }: { lang: Lang }) => {
  const { data: blockNumber } = useBlockNumber({
    chainId: polygon.id,
    watch: true,
  });

  return (
    <>
      {blockNumber && (
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger className="cursor-help" asChild>
              <div
                className={`fixed items-center gap-1 bottom-0 mr-5 mb-5 right-0 text-xs hidden lg:flex text-blue-500 dark:text-blue-300`}
              >
                {Number(blockNumber).toLocaleString("en-US")}
                <div
                  className={`w-2 h-2 bg-blue-500 rounded-full ${loadingFlashClass}`}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content sideOffset={5} side="left" align="center">
                <div className="p-2 text-xs shadow-lg backdrop-blur-xl bg-blue-500 text-gray-100 rounded-xl">
                  {lang === "en"
                    ? "Current block number on Polygon"
                    : "Numéro de bloc actuel sur Polygon"}
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
