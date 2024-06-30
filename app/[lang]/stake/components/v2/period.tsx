import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import ChainContext from "@/contexts/chain";

const Period = ({
  lang,
  stakingPeriod,
  setStakingPeriod
}: {
  lang: Lang;
  stakingPeriod: number;
  setStakingPeriod: (stakingPeriod: number) => void;
}) => {
  const { showTestnet } = useContext(ChainContext);

  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {showTestnet && (
          <li>
            <button
              onClick={() => {
                setStakingPeriod(5);
              }}
              className={`${
                stakingPeriod === 5
                  ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
            >
              {lang === "en" ? "5 minutes" : "5 minutes"}
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              setStakingPeriod(30);
            }}
            className={`${
              stakingPeriod === 30
                ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "1 month" : "1 mois"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setStakingPeriod(91);
            }}
            className={`${
              stakingPeriod === 91
                ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "3 months" : "3 mois"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setStakingPeriod(182);
            }}
            className={`${
              stakingPeriod === 182
                ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "6 months" : "6 mois"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setStakingPeriod(365);
            }}
            className={`${
              stakingPeriod === 365
                ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "1 year" : "1 an"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setStakingPeriod(730);
            }}
            className={`${
              stakingPeriod === 730
                ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "2 years" : "2 ans"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setStakingPeriod(1460);
            }}
            className={`${
              stakingPeriod === 1460
                ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            {lang === "en" ? "4 years" : "4 ans"}
          </button>
        </li>
      </ul>
    </>
  );
};

export default Period;
