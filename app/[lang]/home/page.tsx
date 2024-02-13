"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import lessons from "@/data/lessonsData";
import { Address, useContractRead } from "wagmi";
import { polygon } from "wagmi/chains";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/addresses";
import { Lessons, Lesson, Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useAddress } from "@thirdweb-dev/react";
import Tilt from "react-parallax-tilt";

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
  lang: Lang,
  quizId: number,
  status: string[],
  address: Address | null,
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
  const isExpert = tier === "Expert" && expertBalance > 0 && address;

  const courseLink =
    isIntermediate || isExpert || tier === "Beginner" || tier === "Débutant"
      ? `/${lang}/${quizId}${course.href}`
      : `/${lang}/not-premium`;

  const borderClass =
    (tier === "Expert" && expertBalance > 0) ||
    ((tier === "Intermediate" || tier === "Intermédiaire") &&
      intermediateBalance > 0)
      ? "rainbow-border"
      : "active:border-blue-600 border border-gray-900/20 dark:border-gray-100/40 hover:border-gray-900/50 dark:hover:border-gray-100/50";

  const statusClass =
    status[quizId - 1] === "Not started"
      ? "bg-gray-600 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
      : status[quizId - 1] === "Finished"
      ? "bg-green-600 dark:bg-green-200 text-gray-100 dark:text-gray-900"
      : "";

  return (
    <Link href={`${courseLink}`} key={course.quizId}>
      <div className={`mr-4 my-2`}>
        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.45}
          perspective={800}
          scale={1.05}
        >
          {/*<Image
            height={400}
            width={400}
            src={placeholder}
            alt="Placeholder"
            className="mt-4 rounded-lg"
            />*/}
          <div
            className={`rounded-lg px-4 pb-4 hover:shadow active:border-yellow-500 dark:active:border-yellow-300 active:shadow-none bg-gray-50 dark:bg-gray-900 ${borderClass} backdrop-blur-xl`}
          >
            <div>
              <div
                className={`mt-4 font-semibold text-gray-900 dark:text-gray-100`}
              >
                {title}
              </div>
            </div>
            <div>
              <div className={`text-gray-700 dark:text-gray-300 text-xs`}>
                {description}
              </div>
            </div>
            <div className="flex flex-wrap mt-4 gap-2 items-center">
              {(tier === "Beginner" || tier === "Débutant") && (
                <div className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-gray-600 dark:bg-gray-200 text-gray-100 dark:text-gray-900">
                  {tier} 🐣
                </div>
              )}
              {(tier === "Intermediate" || tier === "Intermédiaire") && (
                <div className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900">
                  {tier} 🙈
                </div>
              )}
              {tier === "Expert" && (
                <div className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-red-600 dark:bg-red-200 text-gray-100 dark:text-gray-900">
                  {tier} 🦊
                </div>
              )}
              {!course.available && (
                <div className="inline-flex items-center rounded-lg  text-xs font-medium bg-transparent text-gray-900 dark:text-gray-100">
                  {typeof dict?.lesson !== "string" && (
                    <>{dict?.lesson.notAvailable}</>
                  )}
                </div>
              )}
              {course.available && (
                <div
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
                </div>
              )}
              {course.sponsored && (
                <div className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-yellow-600 dark:bg-yellow-200 text-gray-100 dark:text-gray-900">
                  {typeof dict?.lesson !== "string" && (
                    <>{dict?.lesson.sponsored} 📚</>
                  )}
                </div>
              )}
              {course.new && (
                <div className="inline-flex items-center ring-1 ring-inset ring-gray-900/20 dark:ring-transparent rounded-lg px-2 py-1 text-xs font-medium gradient-animation text-gray-900 dark:text-gray-900">
                  {typeof dict?.lesson !== "string" && (
                    <>{dict?.lesson.newCourse} 👀</>
                  )}
                </div>
              )}
            </div>
          </div>
        </Tilt>
      </div>
    </Link>
  );
}

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

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    functionName: "balanceOf",
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    functionName: "balanceOf",
    watch: true,
  });

  const intermediateBalance = parseFloat(intermediate as string);
  const expertBalance = parseFloat(expert as string);

  // status = status.map((_, index) =>
  //   QuizStatus({ index, address: address as Address })
  //);

  useEffect(() => {
    const fetchCoursesCompleted = async () => {
      const response = await fetch(
        `/api/database/coursesCompleted?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
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
    }
  }, [address]);

  return (
    <>
      <>
        <form className="mb-10">
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
              className="block w-full p-4 pl-14 focus:shadow focus:border-gray-900/50 dark:focus:border-gray-100/50 text-sm text-gray-900 border border-gray-900/20 rounded-full bg-gray-50 dark:bg-gray-900 dark:border-gray-100/40 dark:placeholder-gray-400 dark:text-white focus:outline-none"
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
            <div className="my-10" key={lesson.category}>
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
                      lang,
                      course.quizId,
                      status,
                      address as Address,
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
