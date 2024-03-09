"use client";

import { Lang } from "@/types/types";
import React, { useState } from "react";

const GetStarted = ({
  lang,
  setFullScreen,
}: {
  lang: Lang;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <button
        onClick={() => setFullScreen(true)}
        className="flex text-sm font-semibold justify-center rounded-full text-gray-100 backdrop-blur-xl px-6 py-2 bg-blue-500 hover:bg-blue-400"
      >
        {lang === "en" ? "Launch the course" : "Lancer le cours"}
      </button>
    </>
  );
};

export default GetStarted;
