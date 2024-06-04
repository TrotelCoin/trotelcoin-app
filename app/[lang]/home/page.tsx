"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import lessons from "@/data/lessons/lessons";
import renderCourses from "@/app/[lang]/home/components/renderCourses";
import type { Lang } from "@/types/language/lang";
import { Lesson, Lessons } from "@/types/courses/lessons";
import { useAccount } from "wagmi";
import Form from "@/app/[lang]/home/components/form";
import { lessonsLength } from "@/utils/courses/lessonsLength";
import { filterByCategory } from "@/utils/courses/filterByCategory";
import { filterByTitleOrDescription } from "@/utils/courses/filterByTitleOrDescription";
import PremiumContext from "@/contexts/premium";
import Link from "next/link";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Home({ params: { lang } }: { params: { lang: Lang } }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string[]>(
    new Array(lessonsLength(lessons)).fill("Not started")
  );

  const scrollRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollRefNewCourses = useRef<HTMLDivElement | null>(null);

  const filterLessons = (lesson: Lessons) => {
    const categoryMatch = filterByCategory(lesson, searchTerm);
    const titleOrDescMatch = lesson.courses.some((course) =>
      filterByTitleOrDescription(course, searchTerm, lang)
    );
    return categoryMatch || titleOrDescMatch;
  };

  const filteredLessons = lessons.filter(filterLessons);

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
    lessonsCompleted?.map((course: { quiz_id: number; answered: boolean }) => {
      if (course.answered) {
        setStatus((prev) => {
          const newState = [...prev];
          newState[course.quiz_id - 1] = "Finished";
          return newState;
        });
      } else {
        setStatus((prev) => {
          const newState = [...prev];
          newState[course.quiz_id - 1] = "Not started";
          return newState;
        });
      }
    });
  }, [address, lessonsCompleted]);

  const scrollLeft = (index: number) => {
    const currentRef = scrollRefs?.current?.[index];
    if (currentRef) {
      if (currentRef.scrollLeft > 0) {
        currentRef.scrollBy({
          left: -currentRef.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRight = (index: number) => {
    const currentRef = scrollRefs?.current?.[index];
    if (currentRef) {
      if (
        currentRef.scrollLeft <
        currentRef.scrollWidth - currentRef.clientWidth
      ) {
        currentRef.scrollBy({
          left: currentRef.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollLeftNewCourses = () => {
    const currentRef = scrollRefNewCourses.current;
    if (currentRef) {
      if (currentRef.scrollLeft > 0) {
        currentRef.scrollBy({
          left: -currentRef.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRightNewCourses = () => {
    const currentRef = scrollRefNewCourses.current;
    if (currentRef) {
      if (
        currentRef.scrollLeft <
        currentRef.scrollWidth - currentRef.clientWidth
      ) {
        currentRef.scrollBy({
          left: currentRef.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const newCourses = lessons.flatMap((lesson) =>
    lesson.courses
      .filter((course) => course.new)
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
        <div className="my-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                {lang === "en" ? "New Courses ⏳" : "Nouveaux Cours ⏳"}
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                onClick={() => scrollLeftNewCourses()}
              >
                <ChevronLeftIcon className="h-4 w-4 text-black dark:text-white" />
              </button>
              <button
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                onClick={() => scrollRightNewCourses()}
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
                const tierOrder = {
                  Beginner: 2,
                  Intermediate: 1,
                  Expert: 0,
                };
                return tierOrder[a.tier.en] - tierOrder[b.tier.en];
              })
              .filter((course: Lesson) => {
                const lowerCaseTitle = course.title[lang].toLowerCase();
                return lowerCaseTitle.includes(searchTerm) && course.available;
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
                  course.category as string
                )
              )}
          </div>
        </div>
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
                        onClick={() => scrollLeft(index)}
                      >
                        <ChevronLeftIcon className="h-4 w-4 text-black dark:text-white" />
                      </button>
                      <button
                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
                        onClick={() => scrollRight(index)}
                      >
                        <ChevronRightIcon className="h-4 w-4 text-black dark:text-white" />
                      </button>
                    </div>
                    <Link
                      href={`/${lang}/category/${lesson.category.toLowerCase()}`}
                    >
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
