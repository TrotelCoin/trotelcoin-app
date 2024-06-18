"use client";

import type { Lang } from "@/types/language/lang";
import type { Lessons } from "@/types/courses/lessons";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import React, { useContext, useEffect, useState } from "react";
import SeparatorVertical from "@/app/[lang]/components/separator/vertical";
import renderCourses from "@/app/[lang]/category/[categoryUrl]/components/renderCourses";
import lessons from "@/data/lessons/lessons";
import { lessonsLength } from "@/utils/courses/lessonsLength";
import { useAccount } from "wagmi";
import PremiumContext from "@/contexts/premium";
import GoHomeButton from "@/app/[lang]/components/buttons/goHome";
import { Skeleton } from "@radix-ui/themes";
import CountUp from "react-countup";

const Page = ({
  params: { lang, categoryUrl }
}: {
  params: { lang: Lang; categoryUrl: string };
}) => {
  const [status, setStatus] = useState<string[]>(
    new Array(lessonsLength(lessons)).fill("Not started")
  );

  const filteredLessons = lessons.filter(
    (lesson) => lesson.categoryUrl === categoryUrl
  );

  const { address } = useAccount();

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  const { data: lessonsCompleted } = useSWR(
    address ? `/api/user/courses/courses-completed?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  <Skeleton loading={!lesson.category}>
                    {lesson.category}
                  </Skeleton>
                </h2>
                <SeparatorVertical />
                <span className="text-base leading-7 text-gray-700 dark:text-gray-300">
                  <Skeleton loading={!lesson.courses}>
                    <CountUp
                      start={0}
                      end={
                        lesson.courses.filter((course) => course.available)
                          .length
                      }
                    />{" "}
                    {lang === "en" ? "lessons" : "leçons"}
                  </Skeleton>
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lesson.courses
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
