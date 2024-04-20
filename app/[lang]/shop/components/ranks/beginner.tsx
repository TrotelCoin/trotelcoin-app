"use client";

import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import "animate.css";
import type { Lang } from "@/types/lang";
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
          className={`overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 rainbow-border backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className={`font-semibold rainbow-text text-2xl`}>
                {lang === "en" ? "Beginner" : "Débutant"}
              </div>
              <Link
                href="https://docs.trotelcoin.com/overview/ranks"
                target="_blank"
              >
                <InformationCircleIcon className="h-6 w-6 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" />
              </Link>
            </div>
            <div className="flex items-center justify-center mt-5">
              <span className="text-8xl">🐣</span>
            </div>
            <div className="flex flex-col mt-5">
              <button className="disabled cursor-not-allowed bg-gray-800 dark:bg-gray-100 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-xl font-semibold">
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
