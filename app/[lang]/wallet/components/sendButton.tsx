"use client";

import { Lang } from "@/types/types";
import React, { useState } from "react";

const SendButton = ({ lang, token }: { lang: Lang; token: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button
        onClick={() => null}
        className="w-full bg-blue-500 hover:bg-blue-400 dark:bg-blue-300 dark:hover:bg-blue-400 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold"
      >
        {isLoading ? (
          <span className="animate__animated animate__slower animate__flash animate__infinite">
            {lang === "en" ? "Loading..." : "Chargement..."}
          </span>
        ) : (
          <>{lang === "en" ? "Send" : "Envoyer"}</>
        )}
      </button>
    </>
  );
};

export default SendButton;
