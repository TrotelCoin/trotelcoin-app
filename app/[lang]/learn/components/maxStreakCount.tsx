import { DictType } from "@/types/types";
import React from "react";

const MaxStreakCount = ({
  dict,
  maxStreak,
}: {
  dict: DictType;
  maxStreak: number;
}) => {
  return (
    <>
      <div className="bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <span className="text-2xl md:text-4xl font-semibold">
          {maxStreak}
          <p className="font-normal text-base">
            {typeof dict?.learn !== "string" && <>{dict?.learn.maxStreak}</>}
          </p>
        </span>
      </div>
    </>
  );
};

export default MaxStreakCount;
