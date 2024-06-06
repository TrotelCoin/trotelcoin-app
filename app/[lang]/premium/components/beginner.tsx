"use client";

import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import "animate.css";
import type { Lang } from "@/types/language/lang";
import Tilt from "react-parallax-tilt";

const Beginner = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.15}
        perspective={800}
        className="h-full"
      >
        <div
          className={`overflow-hidden h-full flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6 w-full">
            <div className="flex items-center justify-between">
              <div className={`font-semibold rainbow-text text-2xl`}>
                {lang === "en" ? "Beginner" : "Débutant"}
              </div>
              <CheckCircleIcon className="h-6 w-6 text-blue-500 dark:text-blue-300" />
            </div>
            <div className="flex items-center justify-center mt-5">
              <span className="text-8xl">🐣</span>
            </div>
            <div className="flex flex-col mt-5">
              <div className="bg-gray-800 dark:bg-gray-100 text-center text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-xl font-semibold">
                {lang === "en" ? "Free" : "Gratuit"}
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
};

export default Beginner;
