"use client";

import { Lang } from "@/types/types";
import React from "react";

const Receive = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div className="mt-4 w-full flex flex-col flex-wrap gap-4 bg-gray-50 border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 rounded-lg py-4 dark:bg-gray-900 text-gray-900 dark:text-gray-100"></div>
    </>
  );
};

export default Receive;
