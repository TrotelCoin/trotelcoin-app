import { Lang } from "@/types/types";
import React from "react";

const Period = ({
  lang,
  stakingPeriod,
  setStakingPeriod,
}: {
  lang: Lang;
  stakingPeriod: number;
  setStakingPeriod: any;
}) => {
  return (
    <>
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            onClick={() => setStakingPeriod(30)}
            className={`${
              stakingPeriod === 30
                ? "bg-black hover:bg-black dark:bg-white dark:hover:bg-white text-gray-300 dark:text-gray-700"
                : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "30 days" : "30 jours"}
          </button>
        </li>
        <li>
          <button
            onClick={() => setStakingPeriod(91)}
            className={`${
              stakingPeriod === 91
                ? "bg-black hover:bg-black dark:bg-white dark:hover:bg-white text-gray-300 dark:text-gray-700"
                : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "3 months" : "3 mois"}
          </button>
        </li>
        <li>
          <button
            onClick={() => setStakingPeriod(182)}
            className={`${
              stakingPeriod === 182
                ? "bg-black hover:bg-black dark:bg-white dark:hover:bg-white text-gray-300 dark:text-gray-700"
                : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "6 months" : "6 mois"}
          </button>
        </li>
        <li>
          <button
            onClick={() => setStakingPeriod(365)}
            className={`${
              stakingPeriod === 365
                ? "bg-black hover:bg-black dark:bg-white dark:hover:bg-white text-gray-300 dark:text-gray-700"
                : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "1 year" : "1 an"}
          </button>
        </li>
      </ul>
    </>
  );
};

export default Period;
