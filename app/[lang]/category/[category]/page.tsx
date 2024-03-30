"use client";

import type { Lang } from "@/types/lang";
import type { Lessons } from "@/types/courses/lessons";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import React, { useContext, useEffect, useState } from "react";
import SeparatorVertical from "@/app/[lang]/components/separator/seperatorVertical";
import renderCourses from "@/app/[lang]/category/[category]/components/renderCourses";
import lessons from "@/data/lessons/lessonsData";
import { lessonsLength } from "@/utils/courses";
import { useAccount } from "wagmi";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import GoHomeButton from "@/app/[lang]/[quizId]/components/goHomeButton";
import CountUp from "react-countup";

const Page = ({
  params: { lang, category },
}: {
  params: { lang: Lang; category: string };
}) => {
  const [status, setStatus] = useState<string[]>(
    new Array(lessonsLength(lessons)).fill("Not started")
  );

  const filteredLessons = lessons.filter(
    (lesson) => lesson.category.toLowerCase() === category.toLowerCase()
  );

  const { address } = useAccount();

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  const { data: lessonsCompleted } = useSWR(
    address ? `/api/database/getUserCoursesCompleted?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: 3600000,
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
      <div className="flex flex-col">
        {filteredLessons.map((lesson: Lessons, index: number) => (
          <div className="mb-10" key={index}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  {lesson.category}
                </h2>
                <SeparatorVertical />
                <span className="text-base leading-7 text-gray-700 dark:text-gray-300">
                  <CountUp start={0} end={lesson.courses.length} />{" "}
                  {lang === "en" ? "lessons" : "leçons"}
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lesson.courses
                .slice()
                .filter((course) => course.available)
                .map((course, index) =>
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
        <GoHomeButton lang={lang} />
      </div>
    </>
  );
};

export default Page;
