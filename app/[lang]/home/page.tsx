"use client";

import React, { useContext, useEffect, useState } from "react";
import lessons from "@/data/lessons/lessonsData";
import renderCourses from "@/app/[lang]/home/components/renderCourses";
import type { Lang } from "@/types/lang";
import { Lesson, Lessons } from "@/types/courses/lessons";
import { useAccount } from "wagmi";
import Form from "@/app/[lang]/home/components/form";
import {
  filterByCategory,
  filterByTitleOrDescription,
  lessonsLength,
} from "@/utils/courses";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import Link from "next/link";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import useSWR from "swr";
import Action from "@/app/[lang]/home/components/action";

export default function Home({ params: { lang } }: { params: { lang: Lang } }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string[]>(
    new Array(lessonsLength(lessons)).fill("Not started")
  );

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
    address ? `/api/database/getUserCoursesCompleted?wallet=${address}` : null,
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

  return (
    <>
      <>
        <Form
          lang={lang}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          filteredLessons={filteredLessons}
        />
        <div className="flex flex-col">
          <div className="mb-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  {lang === "en"
                    ? "Recommended actions"
                    : "Actions recommandées"}
                </h2>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href={`/${lang}/submit-a-course`} className="h-full">
                <Action
                  title={
                    lang === "en" ? "Submit a course" : "Proposer un cours"
                  }
                  color={"Blue"}
                />
              </Link>
              <Link
                href={"https://tally.so/r/nP6ZOQ"}
                target="_blank"
                className="h-full"
              >
                <Action
                  title={
                    lang === "en" ? "Give your feedback" : "Donner votre avis"
                  }
                  color={"Green"}
                />
              </Link>
              <Link href={`/${lang}/shop/items`} className="h-full">
                <Action
                  title={
                    lang === "en" ? "Buy items in the shop" : "Faire des achats"
                  }
                  color={"Yellow"}
                />
              </Link>
            </div>
          </div>
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

                  <Link
                    href={`/${lang}/category/${lesson.category.toLowerCase()}`}
                  >
                    <button className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 px-2 py-1 rounded-full">
                      {lang === "en" ? "View all" : "Voir tout"}
                    </button>
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    .slice(0, 3)
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
