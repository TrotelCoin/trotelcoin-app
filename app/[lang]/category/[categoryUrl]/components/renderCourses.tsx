import type { Lesson } from "@/types/courses/lessons";
import type { Lang } from "@/types/language/lang";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Skeleton } from "@radix-ui/themes";
import React, { useState } from "react";

const RenderCourses = (
  course: Lesson,
  isIntermediate: boolean,
  isExpert: boolean,
  lang: Lang,
  quizId: number,
  status: string[],
  index: number,
  isLoadingFinishedCourses: boolean
) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

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
      className="h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`flex h-full flex-col overflow-hidden rounded-xl active:border-blue-500 active:shadow-none dark:active:border-blue-300 ${
          isHovering
            ? "bg-gray-100 dark:bg-gray-700"
            : "bg-white dark:bg-gray-800"
        } ${borderClass} backdrop-blur-xl`}
      >
        {course.cover ? (
          <div
            className={`flex h-64 w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700`}
          >
            <Image
              src={course.cover as string}
              width={400}
              height={400}
              alt={title}
              className={`transform object-cover transition-transform duration-300 ease-in-out ${
                isHovering && "rotate-2 scale-105 duration-300"
              }`}
            />
          </div>
        ) : (
          <>
            <div
              className={`flex h-64 w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700`}
            >
              <Skeleton className="h-[400px] w-[400px]" />
            </div>
          </>
        )}

        <div className="flex h-1/2 w-full flex-col justify-between p-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <div className={`font-semibold text-gray-900 dark:text-gray-100`}>
                <Skeleton loading={!title}>{title}</Skeleton>
              </div>
            </div>
            <div>
              <div className={`text-xs text-gray-700 dark:text-gray-300`}>
                <Skeleton loading={!description}>{description}</Skeleton>
              </div>
            </div>
          </div>
          <Marquee
            className="mt-4 flex items-center"
            play={true}
            speed={25}
            autoFill={true}
          >
            {!course && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl bg-gray-500 px-2 py-1 text-xs font-medium text-gray-100">
                  <Skeleton loading={true}>Rank 🐣</Skeleton>
                </div>
              </div>
            )}

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

            <div className="px-1">
              <div
                className={`inline-flex items-center rounded-xl ${status[quizId - 1] === "Finished" ? "bg-green-400" : "bg-gray-500"} text-xs font-medium text-gray-900 dark:text-gray-100`}
              >
                <Skeleton loading={isLoadingFinishedCourses}>
                  {isLoadingFinishedCourses
                    ? lang === "en"
                      ? "Not started"
                      : "Pas commencé"
                    : status[quizId - 1] === "Finished"
                      ? lang === "en"
                        ? "Finished"
                        : "Terminé"
                      : lang === "en"
                        ? "Not started"
                        : "Pas commencé"}
                </Skeleton>
              </div>
            </div>

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
