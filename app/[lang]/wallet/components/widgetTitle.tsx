import { loadingFlashClass } from "@/style/loading";
import type { Lang } from "@/types/language/lang";
import React from "react";
import { useAccount } from "wagmi";

const WidgetTitle = ({ title, lang }: { title: string; lang: Lang }) => {
  const { address } = useAccount();

  return (
    <>
      <div className="flex flex-col">
        <span className="font-bold text-base md:text-xl text-gray-900 dark:text-gray-100">{title}</span>
        <div className="flex items-center gap-1">
          <div
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              address ? `bg-green-500 ${loadingFlashClass}` : "bg-gray-500"
            }`}
          />
          {address ? (
            <span className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
              {lang === "en" ? "Connected" : "Connecté"}
            </span>
          ) : (
            <span className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
              {lang === "en" ? "Not connected" : "Non connecté"}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default WidgetTitle;
