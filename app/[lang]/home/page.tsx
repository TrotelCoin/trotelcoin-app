"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import lessons from "@/data/lessonsData";
import { Address, useAccount, useContractRead } from "wagmi";
import { polygon } from "wagmi/chains";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import QuizStatus from "@/app/[lang]/components/quizCompleted";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/addresses";
import { Lessons, Lesson, Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

function filterByCategory(lesson: Lessons, searchTerm: any) {
  return lesson.category.toLowerCase().includes(searchTerm);
}

function filterByTitleOrDescription(
  course: Lesson,
  searchTerm: string,
  lang: Lang
) {
  switch (lang) {
    case "en":
      return (
        course.title.en.toLowerCase().includes(searchTerm) ||
        course.description.en.toLowerCase().includes(searchTerm)
      );
    case "fr":
      return (
        course.title.fr.toLowerCase().includes(searchTerm) ||
        course.description.fr.toLowerCase().includes(searchTerm)
      );
    default:
      return (
        course.title.en.toLowerCase().includes(searchTerm) ||
        course.description.en.toLowerCase().includes(searchTerm)
      );
  }
}

function lessonsLength(lessons: Lessons[]) {
  return lessons.flatMap((lesson) => lesson.courses).length;
}

function renderCourses(
  course: Lesson,
  intermediateBalance: number,
  expertBalance: number,
  isConnected: boolean,
  lang: Lang,
  quizId: number,
  status: string[],
  dict: DictType | null
) {
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
  }

  const isIntermediate =
    (tier === "Intermediate" || tier === "Intermédiaire") &&
    intermediateBalance > 0;
  const isExpert = tier === "Expert" && expertBalance > 0 && isConnected;

  const courseLink =
    isIntermediate || isExpert || tier === "Beginner" || tier === "Débutant"
      ? `/${lang}/${quizId}${course.href}`
      : `/${lang}/not-premium`;

  const borderClass =
    (tier === "Expert" && expertBalance > 0) ||
    ((tier === "Intermediate" || tier === "Intermédiaire") &&
      intermediateBalance > 0)
      ? "rainbow-border"
      : "active:border-blue-600 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50";

  const statusClass =
    status[quizId - 1] === "Not started"
      ? "bg-gray-600 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
      : status[quizId - 1] === "Finished"
      ? "bg-green-600 dark:bg-green-200 text-gray-100 dark:text-gray-900"
      : "";

  return (
    <Link href={`${courseLink}`} key={course.quizId}>
      <div
        className={`rounded-lg hover:shadow mr-4 my-2 active:shadow-none bg-gray-50 dark:bg-gray-900 ${borderClass} backdrop-blur-xl`}
      >
        <div className="px-4 pb-4">
          <h3 className={`mt-4 font-semibold text-gray-900 dark:text-gray-100`}>
            {title}
          </h3>
          <p className={`text-gray-700 dark:text-gray-300 text-xs`}>
            {description}
          </p>
          <div className="flex flex-wrap mt-4 gap-2 items-center">
            {(tier === "Beginner" || tier === "Débutant") && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-gray-600 dark:bg-gray-200 text-gray-100 dark:text-gray-900">
                {tier} 🐣
              </span>
            )}
            {(tier === "Intermediate" || tier === "Intermédiaire") && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900">
                {tier} 🙈
              </span>
            )}
            {tier === "Expert" && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-red-600 dark:bg-red-200 text-gray-100 dark:text-gray-900">
                {tier} 🦊
              </span>
            )}
            {!course.available && (
              <span className="inline-flex items-center rounded-lg  text-xs font-medium bg-transparent text-gray-900 dark:text-gray-100">
                {typeof dict?.lesson !== "string" && (
                  <>{dict?.lesson.notAvailable}</>
                )}
              </span>
            )}
            {course.available && (
              <span
                className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ${statusClass}`}
              >
                {status[quizId - 1] === "Not started" && lang === "en" && (
                  <>Not started 🤔</>
                )}
                {status[quizId - 1] === "Not started" && lang === "fr" && (
                  <>Pas commencé 🤔</>
                )}
                {status[quizId - 1] === "Finished" && lang === "en" && (
                  <>Finished 💪</>
                )}
                {status[quizId - 1] === "Finished" && lang === "fr" && (
                  <>Terminé 💪</>
                )}
              </span>
            )}
            {course.sponsored && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-yellow-600 dark:bg-yellow-200 text-gray-100 dark:text-gray-900">
                {typeof dict?.lesson !== "string" && (
                  <>{dict?.lesson.sponsored} 📚</>
                )}
              </span>
            )}
            {course.new && (
              <span className="inline-flex items-center ring-1 ring-inset ring-gray-900/10 dark:ring-transparent rounded-lg px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-200 dark:from-yellow-200 to-pink-200 dark:to-pink-200 text-gray-900 dark:text-gray-900">
                {typeof dict?.lesson !== "string" && (
                  <>{dict?.lesson.newCourse} 👀</>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home({ params: { lang } }: { params: { lang: Lang } }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dict, setDict] = useState<DictType | null>(null);

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

  const { address, isConnected } = useAccount();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    args: [address],
    account: address,
    enabled: Boolean(address),
    functionName: "balanceOf",
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    args: [address],
    account: address,
    enabled: Boolean(address),
    functionName: "balanceOf",
    watch: true,
  });

  const intermediateBalance = parseFloat(intermediate as string);
  const expertBalance = parseFloat(expert as string);

  let status = new Array(lessonsLength(lessons)).fill("Not started");

  status = status.map((_, index) =>
    QuizStatus({ index, address: address as Address })
  );

  return (
    <>
      <>
        <form className="my-20">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            {typeof dict?.home !== "string" && <>{dict?.home.search}</>}
          </label>
          <div className="relative mx-auto w-full">
            <div className="absolute inset-y-0 left-0 flex items-center px-5 pointer-events-none">
              <>🔍</>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-14 focus:shadow focus:border-gray-900/50 dark:focus:border-gray-100/50 text-sm text-gray-900 border border-gray-900/10 rounded-full bg-gray-50 dark:bg-gray-900 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              placeholder={
                typeof dict?.home !== "string" &&
                typeof dict?.home.search === "string"
                  ? dict?.home.search
                  : "What do you want to learn?"
              }
              onChange={handleSearch}
              style={{ appearance: "none" }}
            />
          </div>
        </form>
        <div className="flex flex-col">
          {filteredLessons.map((lesson) => (
            <div className="py-10" key={lesson.category}>
              <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                {lesson.category}
              </h2>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {lesson.courses
                  .slice()
                  .sort((a, b) => {
                    const tierOrder = {
                      Beginner: 0,
                      Intermediate: 1,
                      Expert: 2,
                    };
                    return tierOrder[a.tier.en] - tierOrder[b.tier.en];
                  })
                  .map((course) =>
                    renderCourses(
                      course,
                      intermediateBalance,
                      expertBalance,
                      isConnected,
                      lang,
                      course.quizId,
                      status,
                      dict
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
