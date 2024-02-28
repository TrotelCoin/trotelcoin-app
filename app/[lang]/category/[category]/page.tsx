"use client";

import { DictType, Lang, Lessons } from "@/types/types";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Address } from "viem";
import renderCourses from "@/app/[lang]/category/[category]/components/renderCourses";
import lessons from "@/data/lessons/lessonsData";
import { lessonsLength } from "@/utils/courses";
import { useAddress } from "@thirdweb-dev/react";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { getDictionary } from "@/app/[lang]/dictionaries";
import GoHomeButton from "@/app/[lang]/[quizId]/components/goHomeButton";

const Page = ({
  params: { lang, category },
}: {
  params: { lang: Lang; category: string };
}) => {
  const [dict, setDict] = useState<DictType | null>(null);
  const [status, setStatus] = useState<string[]>(
    new Array(lessonsLength(lessons)).fill("Not started")
  );

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const filteredLessons = lessons.filter(
    (lesson) => lesson.category.toLowerCase() === category.toLowerCase()
  );

  const address = useAddress();

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  useEffect(() => {
    const fetchCoursesCompleted = async () => {
      const response = await fetch(
        `/api/database/getUserCoursesCompleted?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const result = await response.json();

      result?.map((course: { quiz_id: number; answered: boolean }) => {
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
    };

    if (address) {
      fetchCoursesCompleted();
    } else {
      setStatus(new Array(lessonsLength(lessons)).fill("Not started"));
    }
  }, [address]);

  return (
    <>
      <div className="flex flex-col">
        {filteredLessons.map((lesson: Lessons, index: number) => (
          <div className="mb-10" key={index}>
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100 mt-1">
                {lesson.category}
              </h2>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lesson.courses
                .slice()
                .map((course, index) =>
                  renderCourses(
                    course,
                    isIntermediate,
                    isExpert,
                    lang,
                    course.quizId,
                    status,
                    address as Address,
                    dict,
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
