"use client";

import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import "animate.css";
import type { Lang } from "@/types/language/lang";
import Tilt from "react-parallax-tilt";
import Link from "next/link";

const Beginner = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.15}
        perspective={800}
      >
        <div
          className={`overflow-hidden rounded-xl border border-gray-900/10 bg-white backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className={`rainbow-text text-2xl font-semibold`}>
                {lang === "en" ? "Beginner" : "Débutant"}
              </div>
              <Link
                href="https://docs.trotelcoin.com/overview/ranks"
                target="_blank"
              >
                <InformationCircleIcon className="h-6 w-6 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300" />
              </Link>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <span className="text-8xl">🐣</span>
            </div>
            <div className="mt-5 flex flex-col">
              <button className="disabled cursor-not-allowed rounded-xl bg-gray-800 px-6 py-2 text-sm font-semibold text-gray-100 hover:border-gray-900/50 focus:border-blue-500 dark:bg-gray-100 dark:text-gray-900 dark:hover:border-gray-100/50 dark:focus:border-blue-300">
                {lang === "en" ? "Already claimed" : "Déjà réclamé"}
              </button>
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
};

export default Beginner;
