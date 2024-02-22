import { DictType } from "@/types/types";
import React from "react";

const StreakCount = ({ dict, streak }: { dict: DictType; streak: number }) => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <span className="text-2xl md:text-4xl font-semibold">
          {streak}
          <p className="font-normal text-base">
            {typeof dict?.learn !== "string" && <>{dict?.learn.streak}</>}
          </p>
        </span>
      </div>
    </>
  );
};

export default StreakCount;
