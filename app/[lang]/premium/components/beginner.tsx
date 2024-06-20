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
          className={`flex h-full items-center justify-center overflow-hidden rounded-xl border border-gray-900/10 bg-white backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800`}
        >
          <div className="w-full px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className={`rainbow-text text-2xl font-semibold`}>
                  {lang === "en" ? "Beginner" : "Débutant"}
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Free forever
                </span>
                <CheckCircleIcon className="h-6 w-6 text-blue-500 dark:text-blue-300" />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <span className="text-8xl">🐣</span>
            </div>
            <div className="mt-5 flex flex-col">
              <div className="rounded-xl bg-gray-800 px-6 py-2 text-center text-sm font-semibold text-gray-100 dark:bg-gray-100 dark:text-gray-900">
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
