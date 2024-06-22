"use client";

import { loadingFlashClass } from "@/style/loading";
import type { Lang } from "@/types/language/lang";
import "animate.css";
import React from "react";

const Loading = ({ lang }: { lang: Lang }) => {
  return (
    <div
      className={`flex h-screen items-center justify-center bg-gray-900 text-white`}
    >
      <span className={`${loadingFlashClass}`}>{lang === "en" ? "Ready to learn?" : "Prêt à apprendre?"}</span>
    </div>
  );
};

export default Loading;
