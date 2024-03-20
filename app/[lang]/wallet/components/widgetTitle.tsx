import { loadingFlashClass } from "@/lib/tailwind/loading";
import type { Lang } from "@/types/lang";
import React from "react";
import { useAccount } from "wagmi";

const WidgetTitle = ({ title, lang }: { title: string; lang: Lang }) => {
  const { address } = useAccount();

  return (
    <>
      <div className="flex flex-col">
        <span className="font-bold text-xl">{title}</span>
        <div className="flex items-center gap-1">
          <div
            className={`w-3 h-3 rounded-full ${
              address ? `bg-green-500 ${loadingFlashClass}` : "bg-gray-500"
            }`}
          />
          {address ? (
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {lang === "en" ? "Connected" : "Connecté"}
            </span>
          ) : (
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {lang === "en" ? "Not connected" : "Non connecté"}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default WidgetTitle;
