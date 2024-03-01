"use client";

import React, { useContext, useEffect, useState } from "react";
import lessons from "@/data/lessons/lessonsData";
import { Address } from "wagmi";
import renderCourses from "@/app/[lang]/home/components/renderCourses";
import { Lessons, Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useAddress } from "@thirdweb-dev/react";
import Form from "@/app/[lang]/home/components/form";
import {
  filterByCategory,
  filterByTitleOrDescription,
  lessonsLength,
} from "@/utils/courses";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import Link from "next/link";

export default function Home({ params: { lang } }: { params: { lang: Lang } }) {
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterLessons = (lesson: Lessons) => {
    const categoryMatch = filterByCategory(lesson, searchTerm);
    const titleOrDescMatch = lesson.courses.some((course) =>
      filterByTitleOrDescription(course, searchTerm, lang)
    );
    return categoryMatch || titleOrDescMatch;
  };

  const filteredLessons = lessons.filter(filterLessons);

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
      <>
        <Form dict={dict as DictType} handleSearch={handleSearch} />
        <div className="flex flex-col">
          {filteredLessons.map((lesson, index) => (
            <div className="my-10" key={index}>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100 mt-1">
                  {lesson.category}
                </h2>
                <Link
                  href={`/${lang}/category/${lesson.category.toLowerCase()}`}
                >
                  <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 px-2 py-1 rounded-full">
                    {lang === "en" ? "View all" : "Voir tout"}
                  </button>
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lesson.courses
                  .toSorted((a, b) => {
                    const tierOrder = {
                      Beginner: 2,
                      Intermediate: 1,
                      Expert: 0,
                    };
                    return tierOrder[a.tier.en] - tierOrder[b.tier.en];
                  })
                  .filter((course) => {
                    const lowerCaseTitle = course.title[lang].toLowerCase();
                    return lowerCaseTitle.includes(searchTerm);
                  })
                  .slice(0, 3)
                  .map((course, index) =>
                    renderCourses(
                      course,
                      isIntermediate,
                      isExpert,
                      lang,
                      course.quizId,
                      status,
                      dict,
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
