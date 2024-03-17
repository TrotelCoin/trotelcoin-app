"use client";

import { Lang } from "@/types/types";
import "animate.css";
import React from "react";

const Loading = ({ lang }: { lang: Lang }) => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center h-screen animate__animated animate__flash animate__slower animate__infinite">
      {lang === "en" ? "Ready to learn?" : "Prêt à apprendre?"}
    </div>
  );
};

export default Loading;
