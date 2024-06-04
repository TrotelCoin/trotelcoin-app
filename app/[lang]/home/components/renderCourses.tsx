import type { Lang } from "@/types/language/lang";
import { Lesson } from "@/types/courses/lessons";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const renderCourses = (
  course: Lesson,
  isIntermediate: boolean,
  isExpert: boolean,
  lang: Lang,
  quizId: number,
  status: string[],
  index: number,
  category: string
) => {
  const [isHovering, setIsHovering] = useState(false);
  const [marqueePlay, setMarqueePlay] = useState(false);

  useEffect(() => {
    if (isHovering) {
      setMarqueePlay(true);
    } else {
      setMarqueePlay(false);
    }
  }, [isHovering]);

  let tier = "";
  let title = "";
  let description = "";

  switch (lang) {
    case "en":
      tier = course.tier.en;
      title = course.title.en;
      description = course.description.en;
      break;
    case "fr":
      tier = course.tier.fr;
      title = course.title.fr;
      description = course.description.fr;
      break;
    default:
      tier = course.tier.en;
      title = course.title.en;
      description = course.description.en;
      break;
  }

  const courseLink =
    isIntermediate || isExpert || tier === "Beginner" || tier === "Débutant"
      ? `/${lang}/${quizId}${course.href}`
      : `/${lang}/not-premium`;

  const borderClass = `active:border-blue-500 border border-gray-900/10 dark:border-gray-100/10 ${
    course.cover
      ? ""
      : " hover:border-gray-900/50 dark:hover:border-gray-100/50"
  }`;

  return (
    <Link
      href={`${courseLink}`}
      key={index}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`rounded-xl relative h-64 w-64 overflow-hidden flex flex-col justify-between items-start active:border-blue-500 dark:active:border-blue-300 active:shadow-none ${
          isHovering
            ? "bg-gray-100 dark:bg-gray-700"
            : "bg-white dark:bg-gray-800"
        } ${borderClass} backdrop-blur-xl`}
      >
        {course.cover && (
          <div className="flex items-center justify-center overflow-hidden w-full h-full bg-gray-100 dark:bg-gray-700">
            <Image
              src={course.cover as string}
              width={500}
              height={500}
              alt={title}
              className={`object-cover transform transition-transform duration-300 ease-in-out ${
                isHovering && "scale-105 rotate-2 duration-300"
              }`}
            />
          </div>
        )}

        <div className="p-4 w-full h-full flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
              <div className="text-xs text-gray-700 dark:text-gray-300">
                {category}
              </div>
              {course.available &&
                ((status[quizId - 1] === "Finished" && lang === "en") ||
                  (status[quizId - 1] === "Terminé" && lang === "fr")) && (
                  <CheckCircleIcon className="h-3 w-3 text-green-500 dark:text-green-300" />
                )}
            </div>

            <div className="flex items-center">
              <div className={`font-semibold text-gray-900 dark:text-gray-100`}>
                {title}
              </div>
            </div>
          </div>

          <Marquee
            className="flex mt-4 items-center overflow-hidden whitespace-nowrap"
            play={marqueePlay}
          >
            {course.sponsored && (
              <div className="px-0.5">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-blue-400 text-gray-100">
                  {lang === "en" ? "Sponsored 📚" : "Sponsorisé 📚"}
                </div>
              </div>
            )}

            {course.new && (
              <div className="px-0.5">
                <div className="inline-flex items-center ring-1 ring-inset ring-gray-900/20 dark:ring-transparent rounded-xl px-2 py-1 text-xs font-medium gradient-animation text-gray-900 dark:text-gray-900">
                  {lang === "en" ? "New 👀" : "Nouveau 👀"}
                </div>
              </div>
            )}

            {(tier === "Beginner" || tier === "Débutant") && (
              <div className="px-0.5">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-gray-500 text-gray-100">
                  {tier} 🐣
                </div>
              </div>
            )}

            {(tier === "Intermediate" || tier === "Intermédiaire") && (
              <div className="px-0.5">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-blue-400 text-gray-100">
                  {tier} 🙈
                </div>
              </div>
            )}

            {tier === "Expert" && (
              <div className="px-0.5">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-red-400 text-gray-100">
                  {tier} 🦊
                </div>
              </div>
            )}

            {!course.available && (
              <div className="px-0.5">
                <div className="inline-flex items-center rounded-xl text-xs font-medium bg-transparent text-gray-900 dark:text-gray-100">
                  {lang === "en" ? "Not available" : "Non disponible"}
                </div>
              </div>
            )}
          </Marquee>
        </div>
      </div>
    </Link>
  );
};

export default renderCourses;
