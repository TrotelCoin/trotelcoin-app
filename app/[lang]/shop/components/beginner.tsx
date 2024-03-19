"use client";

import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import "animate.css";
import { Lang } from "@/types/types";
import Tilt from "react-parallax-tilt";

const Beginner = ({ lang }: { lang: Lang }) => {
  const advantages = {
    1: lang === "en" ? "Free courses" : "Cours gratuit",
    2: lang === "en" ? "Crypto rewards" : "Récompenses en crypto",
  };

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
          className={`overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 rainbow-border backdrop-blur-xl`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-1">
              <div className={`font-semibold rainbow-text text-2xl`}>
                🐣 {lang === "en" ? "Beginner" : "Débutant"}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col mt-4">
                <div className="flex flex-col gap-2 my-4">
                  {Object.values(advantages).map((advantage, index) => (
                    <div key={index} className="flex gap-1">
                      <div className="text-gray-700 flex items-center dark:text-gray-300">
                        <CheckIcon className="h-5 w-5" />
                        <>{advantage}</>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="disabled cursor-not-allowed bg-gray-800 dark:bg-gray-200 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-xl font-semibold">
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
