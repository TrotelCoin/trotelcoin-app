"use client";

import type { Lang } from "@/types/language/lang";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { vocabulary } from "@/data/vocabulary/vocabulary";
import Image from "next/image";
import getRandomVocabulary from "@/utils/vocabulary/getRandomVocabulary";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import type { Vocabulary, VocabularyItem } from "@/types/vocabulary/vocabulary";

const VocabularyPage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [randomVocabulary, setRandomVocabulary] = useState<Vocabulary>(
    getRandomVocabulary(vocabulary)
  );

  return (
    <>
      <div className="mt-16">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          style={{ width: "240px", height: "320px" }}
        >
          {randomVocabulary.map((item: VocabularyItem, index: number) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center justify-center rounded-xl border border-gray-900/10 bg-white shadow-xl dark:border-gray-100/10 dark:bg-gray-800"
            >
              <span className="absolute right-0 top-0 m-4 text-xs font-bold text-gray-900 dark:text-gray-100">
                {index + 1} / 10
              </span>
              <div className="flex flex-col items-center gap-2 px-8 py-24 text-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {lang === "en" ? item.en.word : item.fr.word}
                </span>
                <span className="text-xs text-gray-900 dark:text-gray-100">
                  {lang === "en" ? item.en.definition : item.fr.definition}
                </span>
                <div className="absolute bottom-0 left-0 m-2">
                  <Image
                    src="/assets/logo/trotelcoin-white.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="block dark:hidden"
                  />
                  <Image
                    src="/assets/logo/trotelcoin.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="hidden dark:block"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-16 flex items-center justify-center">
          <BlueButton
            lang={lang}
            text={lang === "en" ? "Shuffe" : "Mélanger"}
            onClick={() => setRandomVocabulary(getRandomVocabulary(vocabulary))}
          />
        </div>
      </div>
    </>
  );
};

export default VocabularyPage;
