"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import lessons from "@/data/lessons/lessons";
import renderCourses from "@/app/[lang]/home/components/renderCourses";
import type { Lang } from "@/types/language/lang";
import type { Lesson, LessonCategory, Lessons } from "@/types/courses/lessons";
import { useAccount } from "wagmi";
import Form from "@/app/[lang]/home/components/form";
import { lessonsLength } from "@/utils/courses/lessonsLength";
import PremiumContext from "@/contexts/premium";
import Link from "next/link";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { getCoursesRecommendations } from "@/utils/user/getCoursesRecommendations";
import {
  findLessonCategory,
  filterLessons,
} from "@/utils/lessons/getInformationsFromLesson";

export default function Home({ params: { lang } }: { params: { lang: Lang } }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string[]>(
    new Array(lessonsLength(lessons)).fill("Not started")
  );
  const [forYouCourses, setForYouCourses] = useState<Lesson[]>([]);

  const { address } = useAccount();

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  const { data: lessonsCompleted } = useSWR(
    address ? `/api/user/courses/courses-completed?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (lessonsCompleted) {
      const newStatus = [...status];
      lessonsCompleted.forEach(
        (course: { quiz_id: number; answered: boolean }) => {
          newStatus[course.quiz_id - 1] = course.answered
            ? "Finished"
            : "Not started";
        }
      );
      setStatus(newStatus);
    }
  }, [lessonsCompleted, status]);

  useEffect(() => {
    const getRecommendations = async () => {
      if (address) {
        const recommendedLessons = await getCoursesRecommendations(address);
        const forYouCourses = recommendedLessons.map((lesson: Lesson) => {
          const category = lessons.find(findLessonCategory(lesson))?.category;
          return { ...lesson, category };
        });
        setForYouCourses(forYouCourses);
      }
    };

    getRecommendations();
  }, [address]);

  const scrollRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollRefForYouCourses = useRef<HTMLDivElement | null>(null);
  const scrollRefNewCourses = useRef<HTMLDivElement | null>(null);
  const scrollRefSponsoredCourses = useRef<HTMLDivElement | null>(null);

  const filteredLessons = lessons.filter((lesson) =>
    filterLessons(lesson, searchTerm, lang)
  );

  const scroll = (
    ref: React.RefObject<HTMLDivElement> | HTMLDivElement,
    direction: "left" | "right"
  ) => {
    const element = "current" in ref ? ref.current : ref;

    if (element) {
      const scrollAmount =
        direction === "left" ? -element.clientWidth : element.clientWidth;
      element.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const newCourses = lessons.flatMap((lesson) =>
    lesson.courses
      .filter((course) => course.new)
      .map((course) => ({ ...course, category: lesson.category }))
  );

  const sponsoredCourses = lessons.flatMap((lesson) =>
    lesson.courses
      .filter((course) => course.sponsored)
      .map((course) => ({ ...course, category: lesson.category }))
  );

  return (
    <>
      <>
        <Form
          lang={lang}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          filteredLessons={filteredLessons}
        />

        {forYouCourses && forYouCourses.length > 0 && (
          <div className="my-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  {lang === "en" ? "For You" : "Pour Vous"}
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                  onClick={() => scroll(scrollRefForYouCourses, "left")}
                >
                  <ChevronLeftIcon className="h-4 w-4 text-black dark:text-white" />
                </button>
                <button
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                  onClick={() => scroll(scrollRefForYouCourses, "right")}
                >
                  <ChevronRightIcon className="h-4 w-4 text-black dark:text-white" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRefForYouCourses}
              className="mt-4 overflow-x-auto flex items-center gap-4 scroll-smooth hide-scrollbar"
            >
              {forYouCourses
                .filter((course: Lesson) => {
                  const lowerCaseTitle = course.title[lang].toLowerCase();
                  return (
                    lowerCaseTitle.includes(searchTerm) && course.available
                  );
                })
                .slice(0, 10)
                .map((course: Lesson, index: number) =>
                  renderCourses(
                    course,
                    isIntermediate,
                    isExpert,
                    lang,
                    course.quizId,
                    status,
                    index,
                    course.category as LessonCategory
                  )
                )}
            </div>
          </div>
        )}

        {newCourses && newCourses.length > 0 && (
          <div className="my-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  {lang === "en" ? "New Courses" : "Nouveaux Cours"}
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                  onClick={() => scroll(scrollRefNewCourses, "left")}
                >
                  <ChevronLeftIcon className="h-4 w-4 text-black dark:text-white" />
                </button>
                <button
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                  onClick={() => scroll(scrollRefNewCourses, "right")}
                >
                  <ChevronRightIcon className="h-4 w-4 text-black dark:text-white" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRefNewCourses}
              className="mt-4 overflow-x-auto flex items-center gap-4 scroll-smooth hide-scrollbar"
            >
              {newCourses
                .sort((a: Lesson, b: Lesson) => {
                  return b.date.getTime() - a.date.getTime();
                })
                .filter((course: Lesson) => {
                  const lowerCaseTitle = course.title[lang].toLowerCase();
                  return (
                    lowerCaseTitle.includes(searchTerm) && course.available
                  );
                })
                .slice(0, 10)
                .map((course: Lesson, index: number) =>
                  renderCourses(
                    course,
                    isIntermediate,
                    isExpert,
                    lang,
                    course.quizId,
                    status,
                    index,
                    course.category as LessonCategory
                  )
                )}
            </div>
          </div>
        )}

        {sponsoredCourses && sponsoredCourses.length > 0 && (
          <div className="my-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  {lang === "en" ? "Sponsored" : "Sponsorisé"}
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                  onClick={() => scroll(scrollRefSponsoredCourses, "left")}
                >
                  <ChevronLeftIcon className="h-4 w-4 text-black dark:text-white" />
                </button>
                <button
                  className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                  onClick={() => scroll(scrollRefSponsoredCourses, "right")}
                >
                  <ChevronRightIcon className="h-4 w-4 text-black dark:text-white" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRefSponsoredCourses}
              className="mt-4 overflow-x-auto flex items-center gap-4 scroll-smooth hide-scrollbar"
            >
              {sponsoredCourses
                .sort((a: Lesson, b: Lesson) => {
                  return b.date.getTime() - a.date.getTime();
                })
                .sort(() => 0.5 - Math.random())
                .filter((course: Lesson) => {
                  const lowerCaseTitle = course.title[lang].toLowerCase();
                  return (
                    lowerCaseTitle.includes(searchTerm) && course.available
                  );
                })
                .slice(0, 10)
                .map((course: Lesson, index: number) =>
                  renderCourses(
                    course,
                    isIntermediate,
                    isExpert,
                    lang,
                    course.quizId,
                    status,
                    index,
                    course.category as LessonCategory
                  )
                )}
            </div>
          </div>
        )}

        <div className="flex flex-col">
          {filteredLessons
            .filter((lesson) =>
              lesson.courses.some(
                (course: { available: boolean }) => course.available
              )
            )
            .map((lesson: Lessons, index: number) => (
              <div className="my-10" key={index}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                      {lesson.category}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                      <button
                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                        onClick={() => {
                          if (scrollRefs.current[index] !== null) {
                            scroll(scrollRefs.current[index]!, "left");
                          }
                        }}
                      >
                        <ChevronLeftIcon className="h-4 w-4 text-black dark:text-white" />
                      </button>
                      <button
                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                        onClick={() => {
                          if (scrollRefs.current[index] !== null) {
                            scroll(scrollRefs.current[index]!, "right");
                          }
                        }}
                      >
                        <ChevronRightIcon className="h-4 w-4 text-black dark:text-white" />
                      </button>
                    </div>
                    <Link href={`/${lang}/category/${lesson.categoryUrl}`}>
                      <button className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 px-2 py-1 rounded-full">
                        {lang === "en" ? "View all" : "Voir tout"}
                      </button>
                    </Link>
                  </div>
                </div>
                <div
                  ref={(el) => (scrollRefs.current[index] = el)}
                  className="mt-4 overflow-x-auto flex items-center gap-4 scroll-smooth hide-scrollbar"
                >
                  {lesson.courses
                    .sort((a: Lesson, b: Lesson) => {
                      const tierOrder = {
                        Beginner: 2,
                        Intermediate: 1,
                        Expert: 0,
                      };
                      return tierOrder[a.tier.en] - tierOrder[b.tier.en];
                    })
                    .filter((course: Lesson) => {
                      const lowerCaseTitle = course.title[lang].toLowerCase();
                      return (
                        lowerCaseTitle.includes(searchTerm) && course.available
                      );
                    })
                    .slice(0, 10)
                    .map((course: Lesson, index: number) =>
                      renderCourses(
                        course,
                        isIntermediate,
                        isExpert,
                        lang,
                        course.quizId,
                        status,
                        index,
                        lesson.category
                      )
                    )}
                </div>
              </div>
            ))}
        </div>
      </>
    </>
  );
}
