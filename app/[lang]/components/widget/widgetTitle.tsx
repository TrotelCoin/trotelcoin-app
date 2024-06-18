import { loadingFlashClass } from "@/style/loading";
import type { Lang } from "@/types/language/lang";
import React from "react";
import { useAccount } from "wagmi";

const WidgetTitle = ({ title, lang }: { title: string; lang: Lang }) => {
  const { address } = useAccount();

  return (
    <>
      <div className="flex flex-col">
        <span className="text-base font-bold text-gray-900 dark:text-gray-100 md:text-xl">
          {title}
        </span>
        <div className="flex items-center gap-1">
          <div
            className={`h-2 w-2 rounded-full md:h-3 md:w-3 ${
              address ? `bg-green-500 ${loadingFlashClass}` : "bg-gray-500"
            }`}
          />
          {address ? (
            <span className="text-xs text-gray-700 dark:text-gray-300 md:text-sm">
              {lang === "en" ? "Connected" : "Connecté"}
            </span>
          ) : (
            <span className="text-xs text-gray-700 dark:text-gray-300 md:text-sm">
              {lang === "en" ? "Not connected" : "Non connecté"}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default WidgetTitle;
