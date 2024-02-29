"use client";

import { Lang } from "@/types/types";
import "animate.css";
import React from "react";

const Loading = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center h-screen animate__animated animate__flash animate__slower animate__infinite">
      {lang === "en"
        ? "TrotelCoin's courses are loading..."
        : "Les cours de TrotelCoin sont en train de charger..."}
    </div>
  );
};

export default Loading;
