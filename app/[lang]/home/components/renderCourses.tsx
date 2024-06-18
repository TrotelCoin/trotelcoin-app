import type { Lang } from "@/types/language/lang";
import { Lesson, LessonCategory, Lessons } from "@/types/courses/lessons";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { lessons } from "@/data/lessons/lessons";
import Marquee from "react-fast-marquee";

const RenderCourses = (
  course: Lesson,
  isIntermediate: boolean,
  isExpert: boolean,
  lang: Lang,
  quizId: number,
  status: string[],
  index: number,
  category: LessonCategory
) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [categoryLogo, setCategoryLogo] = useState<string | null>(null);

  useEffect(() => {
    const getCategoryLogo = () => {
      const categoryLogo: string = lessons.find(
        (lesson: Lessons) => lesson.category === category
      )?.logo as string;
      setCategoryLogo(categoryLogo);
    };

    getCategoryLogo();
  }, [category]);

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
        className={`relative flex h-64 w-64 flex-col items-start justify-between overflow-hidden rounded-xl active:border-blue-500 active:shadow-none dark:active:border-blue-300 ${
          isHovering
            ? "bg-gray-100 dark:bg-gray-700"
            : "bg-white dark:bg-gray-800"
        } ${borderClass} backdrop-blur-xl`}
      >
        {course.cover && (
          <div className="flex h-full w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={course.cover as string}
              width={500}
              height={500}
              alt={title}
              className={`transform object-cover transition-transform duration-300 ease-in-out ${
                isHovering && "rotate-2 scale-105 duration-300"
              }`}
            />
          </div>
        )}

        <div className="flex h-full w-full flex-col justify-between p-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
              <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
                {categoryLogo && (
                  <>
                    <Image
                      src={categoryLogo}
                      width={15}
                      height={15}
                      alt={category}
                      className="object-cover"
                    />
                  </>
                )}
                {category}{" "}
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
            play={true}
            speed={25}
            autoFill={true}
            className="mt-4 flex items-center overflow-hidden whitespace-nowrap"
          >
            {course.sponsored && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl bg-orange-400 px-2 py-1 text-xs font-medium text-gray-100">
                  {lang === "en" ? "Sponsored 📚" : "Sponsorisé 📚"}
                </div>
              </div>
            )}

            {course.new && (
              <div className="px-1">
                <div className="gradient-animation inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-900/20 dark:text-gray-900 dark:ring-transparent">
                  {lang === "en" ? "New 👀" : "Nouveau 👀"}
                </div>
              </div>
            )}

            {(tier === "Beginner" || tier === "Débutant") && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl bg-gray-500 px-2 py-1 text-xs font-medium text-gray-100">
                  {tier} 🐣
                </div>
              </div>
            )}

            {(tier === "Intermediate" || tier === "Intermédiaire") && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl bg-blue-400 px-2 py-1 text-xs font-medium text-gray-100">
                  {tier} 🙈
                </div>
              </div>
            )}

            {tier === "Expert" && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium text-gray-100">
                  {tier} 🦊
                </div>
              </div>
            )}

            {!course.available && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl bg-transparent text-xs font-medium text-gray-900 dark:text-gray-100">
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

export default RenderCourses;
