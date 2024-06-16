import type { Lesson } from "@/types/courses/lessons";
import type { Lang } from "@/types/language/lang";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Skeleton } from "@radix-ui/themes";

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
      className="h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`rounded-xl h-full flex flex-col overflow-hidden active:border-blue-500 dark:active:border-blue-300 active:shadow-none ${
          isHovering
            ? "bg-gray-100 dark:bg-gray-700"
            : "bg-white dark:bg-gray-800"
        } ${borderClass} backdrop-blur-xl`}
      >
        {course.cover ? (
          <div
            className={`flex items-center justify-center overflow-hidden w-full h-64 bg-gray-100 dark:bg-gray-700`}
          >
            <Image
              src={course.cover as string}
              width={400}
              height={400}
              alt={title}
              className={`object-cover transform transition-transform duration-300 ease-in-out ${
                isHovering && "scale-105 rotate-2 duration-300"
              }`}
            />
          </div>
        ) : (
          <>
            <div
              className={`flex items-center justify-center overflow-hidden w-full h-64 bg-gray-100 dark:bg-gray-700`}
            >
              <Skeleton width="400px" height="400px" />
            </div>
          </>
        )}

        <div className="p-4 w-full flex flex-col justify-between h-1/2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <div className={`font-semibold text-gray-900 dark:text-gray-100`}>
                <Skeleton loading={!title}>{title}</Skeleton>
              </div>
            </div>
            <div>
              <div className={`text-gray-700 dark:text-gray-300 text-xs`}>
                <Skeleton loading={!description}>{description}</Skeleton>
              </div>
            </div>
          </div>
          <Marquee className="flex mt-4 items-center" play={marqueePlay}>
            {!course && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-gray-500 text-gray-100">
                  <Skeleton loading={true}>Rank 🐣</Skeleton>
                </div>
              </div>
            )}
            {course.sponsored && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-orange-400 text-gray-100">
                  {lang === "en" ? "Sponsored 📚" : "Sponsorisé 📚"}
                </div>
              </div>
            )}
            {course.new && (
              <div className="px-1">
                <div className="inline-flex items-center ring-1 ring-inset ring-gray-900/20 dark:ring-transparent rounded-xl px-2 py-1 text-xs font-medium gradient-animation text-gray-900 dark:text-gray-900">
                  {lang === "en" ? "New 👀" : "Nouveau 👀"}
                </div>
              </div>
            )}
            {(tier === "Beginner" || tier === "Débutant") && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-gray-500 text-gray-100">
                  {tier} 🐣
                </div>
              </div>
            )}
            {(tier === "Intermediate" || tier === "Intermédiaire") && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-blue-400 text-gray-100">
                  {tier} 🙈
                </div>
              </div>
            )}
            {tier === "Expert" && (
              <div className="px-1">
                <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-red-400 text-gray-100">
                  {tier} 🦊
                </div>
              </div>
            )}
            {!course.available && (
              <div className="px-1">
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
