"use client";

import { loadingFlashClass } from "@/lib/tailwind/loading";
import type { Lang } from "@/types/lang";
import "animate.css";
import React from "react";

const Loading = ({ lang }: { lang: Lang }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center h-screen ${loadingFlashClass}`}
    >
      {lang === "en" ? "Ready to learn?" : "Prêt à apprendre?"}
    </div>
  );
};

export default Loading;
