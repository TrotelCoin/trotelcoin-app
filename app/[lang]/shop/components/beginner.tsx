"use client";

import React, { useEffect, useState } from "react";
import "animate.css";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Tilt from "react-parallax-tilt";

const Beginner = ({ lang }: { lang: Lang }) => {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const advantages = {
    1: typeof dict?.beginner !== "string" && dict?.beginner.advantage1,
    2: typeof dict?.beginner !== "string" && dict?.beginner.advantage2,
  };

  return (
    <>
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.45}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-1 text-gray-900 dark:text-gray-100"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        <>{advantage}</>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="disabled cursor-not-allowed bg-gray-800 dark:bg-gray-200 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-xl font-semibold">
                {typeof dict?.shop !== "string" && <>{dict?.shop.claimed}</>}
              </button>
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
};

export default Beginner;
