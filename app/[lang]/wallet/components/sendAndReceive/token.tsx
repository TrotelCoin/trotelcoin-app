import { Lang } from "@/types/types";
import React from "react";

const Token = ({
  lang,
  token,
  setToken,
}: {
  lang: Lang;
  token: string;
  setToken: (token: string) => void;
}) => {
  return (
    <>
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            onClick={() => setToken("MATIC")}
            className={`${
              token === "MATIC"
                ? "bg-gray-900 hover:bg-gray-900 dark:bg-white dark:hover:bg-white text-gray-400 dark:text-gray-600"
                : "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            MATIC
          </button>
        </li>
        <li>
          <button
            onClick={() => setToken("TROTEL")}
            className={`${
              token === "TROTEL"
                ? "bg-gray-900 hover:bg-gray-900 dark:bg-white dark:hover:bg-white text-gray-400 dark:text-gray-600"
                : "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            TROTEL
          </button>
        </li>
        {/*
        <li>
          <button
            onClick={() => setToken("USDC")}
            className={`${
              token === "USDC"
                ? "bg-gray-900 hover:bg-gray-900 dark:bg-white dark:hover:bg-white text-gray-400 dark:text-gray-600"
                : "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            USDC
          </button>
        </li>
        */}
      </ul>
    </>
  );
};

export default Token;
