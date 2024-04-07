"use client";

import React from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import type { Lang } from "@/types/lang";

const Learn = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/${lang}/learn/chapters`} className="h-full">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full flex items-center justify-center bg-blue-500 dark:bg-blue-500 shadow-xl active:border-gray-900 active:bg-blue-400 dark:active:bg-blue-400 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Chapters" : "Chapitres"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Get tailored lessons from your interests and level"
                  : "Obtenez des leçons adaptées à vos intérêts et à votre niveau"}
              </span>
            </div>
          </Tilt>
        </Link>
        <Link href={`/${lang}/learn/vocabulary`} className="h-full">
          <Tilt
            glareEnable={true}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareMaxOpacity={0.15}
            perspective={800}
            className="h-full flex items-center justify-center bg-yellow-500 dark:bg-yellow-500 shadow-xl active:border-gray-900 active:bg-yellow-400 dark:active:bg-yellow-400  border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-12"
          >
            <div className="flex flex-col items-center text-center justify-center gap-2">
              <h2 className="text-gray-100 font-semibold text-4xl">
                {lang === "en" ? "Vocabulary" : "Vocabulaire"}
              </h2>
              <span className="text-gray-100">
                {lang === "en"
                  ? "Learn new words and expressions from the crypto world"
                  : "Apprenez de nouveaux mots et expressions du monde de la cryptomonnaie"}
              </span>
            </div>
          </Tilt>
        </Link>
      </div>
    </>
  );
};

export default Learn;
