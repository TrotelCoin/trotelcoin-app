import { Lang } from "@/types/types";
import React from "react";

const Token = ({
  lang,
  token,
  setToken,
}: {
  lang: Lang;
  token: string;
  setToken: any;
}) => {
  return (
    <>
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            onClick={() => setToken("MATIC")}
            className={`${
              token === "MATIC"
                ? "bg-black hover:bg-black dark:bg-white dark:hover:bg-white text-gray-300 dark:text-gray-700"
                : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                ? "bg-black hover:bg-black dark:bg-white dark:hover:bg-white text-gray-300 dark:text-gray-700"
                : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
          >
            TROTEL
          </button>
        </li>
      </ul>
    </>
  );
};

export default Token;
