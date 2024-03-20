import { Lang } from "@/types/lang";
import React from "react";
import { BoltIcon } from "@heroicons/react/24/solid";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const SwapData = ({
  lang,
  isLoading,
  gasPrice,
}: {
  lang: Lang;
  isLoading: boolean;
  gasPrice: number;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="mt-2 flex items-center px-4 justify-between">
          <div className="flex items-center gap-1">
            <BoltIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className={`text-gray-700 dark:text-gray-300 text-xs`}>
              {lang === "en" ? "Gas price" : "Frais de gaz"}{" "}
            </span>
          </div>
          <span
            className={`text-gray-700 dark:text-gray-300 text-xs ${
              isLoading && loadingFlashClass
            }`}
          >
            ${gasPrice ? Number(gasPrice.toFixed(3)) : 0}
          </span>
        </div>
      </div>
    </>
  );
};

export default SwapData;
