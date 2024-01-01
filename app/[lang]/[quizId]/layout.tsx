"use client";

import "animate.css";
import { Course, DictType, Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import lessons from "@/data/lessonsData";
import Link from "next/link";
import Quiz from "@/app/[lang]/components/quiz";
import { useAccount, useContractRead } from "wagmi";
import GoHomeButton from "@/app/[lang]/components/goHomeButton";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/addresses";
import { polygon } from "viem/chains";
import { getDictionary } from "@/app/[lang]/dictionaries";

const getTierByQuizId = (quizIdParam: number): string => {
  let foundTier = "";
  lessons.forEach((lesson) => {
    lesson.courses.forEach((course) => {
      if (course.quizId.toString() === quizIdParam.toString()) {
        foundTier = course.tier.en;
      }
    });
  });
  return foundTier;
};

const getAvailabilityByQuizId = (quizIdParam: number): boolean => {
  let foundAvailability = false;
  lessons.forEach((lesson) => {
    lesson.courses.forEach((course) => {
      if (course.quizId.toString() === quizIdParam.toString()) {
        foundAvailability = course.available;
      }
    });
  });
  return foundAvailability;
};

const CoursePage = ({
  params: { lang, quizId },
  children,
}: {
  params: { lang: Lang; quizId: number };
  children: React.ReactNode;
}) => {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const foundTier = getTierByQuizId(quizId);
  const foundAvailability = getAvailabilityByQuizId(quizId);

  const currentCourse: Course = lessons
    .flatMap((lesson) => lesson.courses)
    .find((course) => course.quizId.toString() === quizId.toString()) as Course;

  let tier = "";
  let title = "";
  let description = "";

  switch (lang) {
    case "en":
      tier = foundTier;
      title = currentCourse?.title.en;
      break;
    case "fr":
      tier = foundTier;
      title = currentCourse?.title.fr;
      break;
    default:
      tier = foundTier;
      title = currentCourse?.title.en;
  }

  const { address, isDisconnected } = useAccount();

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

  const renderUnauthorizedContent = () => {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-white dark:bg-black px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              {typeof dict?.lesson !== "string" && (
                <>{dict?.lesson.notAvailable}</>
              )}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
              {typeof dict?.lesson !== "string" && (
                <>{dict?.lesson.notAvailableMessage}</>
              )}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${lang}/home`}
                className="rounded-md bg-blue-600 dark:bg-blue-200 px-3.5 py-2.5 text-sm font-semibold text-gray-100 dark:text-gray-900 shadow-sm hover:bg-blue-800 dark:hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {typeof dict?.lesson !== "string" && (
                  <>{dict?.lesson.goBackHome}</>
                )}
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  };

  const renderCourseContent = (children: React.ReactNode) => {
    return (
      <>
        <div className="mx-auto max-w-2xl text-base leading-7 text-gray-900 dark:text-gray-100">
          <p className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-200">
            {typeof dict?.lesson !== "string" && <>{dict?.lesson.course}</>}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-gray-900 dark:text-gray-100">
            {typeof dict?.lesson !== "string" && (
              <>{dict?.lesson.goingToLearn}</>
            )}
          </p>
          <div className="bg-gray-50 my-10 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-lg px-10 py-2 dark:bg-gray-900">
            <ul
              role="list"
              className="max-w-xl space-y-8 text-gray-700 dark:text-gray-300"
            >
              <div className="grid grid-cols-1 divide-y divide-gray-900/10 dark:divide-gray-100/10">
                <div className="py-4">
                  <li className="flex gap-x-3">
                    <span className="text-gray-900 dark:text-gray-100">
                      {typeof dict?.lesson !== "string" &&
                        typeof dict?.lesson.lessons !== "string" &&
                        typeof dict?.lesson.lessons.introductionToTrotelCoin !==
                          "string" && (
                          <>
                            {dict?.lesson.lessons.introductionToTrotelCoin.one}
                          </>
                        )}
                    </span>
                  </li>
                </div>
                <div className="py-4">
                  <li className="flex gap-x-3">
                    <span className="text-gray-900 dark:text-gray-100">
                      {typeof dict?.lesson !== "string" &&
                        typeof dict?.lesson.lessons !== "string" &&
                        typeof dict?.lesson.lessons.introductionToTrotelCoin !==
                          "string" && (
                          <>
                            {dict?.lesson.lessons.introductionToTrotelCoin.two}
                          </>
                        )}
                    </span>
                  </li>
                </div>
                <div className="py-4">
                  <li className="flex gap-x-3">
                    <span className="text-gray-900 dark:text-gray-100">
                      {typeof dict?.lesson !== "string" &&
                        typeof dict?.lesson.lessons !== "string" &&
                        typeof dict?.lesson.lessons.introductionToTrotelCoin !==
                          "string" && (
                          <>
                            {
                              dict?.lesson.lessons.introductionToTrotelCoin
                                .three
                            }
                          </>
                        )}
                    </span>
                  </li>
                </div>
              </div>
            </ul>
          </div>
          <>{children}</>

          {/* Quizz */}
          <Quiz quizId={quizId} lang={lang} />
          <GoHomeButton lang={lang} />
        </div>
      </>
    );
  };

  return (
    <>
      {isDisconnected && tier !== "Beginner"
        ? renderUnauthorizedContent()
        : !foundAvailability ||
          (tier !== "Beginner" &&
            (((tier === "Intermediate" || tier === "Intermédiaire") && intermediateBalance < 1) ||
              (tier === "Expert" && expertBalance < 1)))
        ? renderUnauthorizedContent()
        : renderCourseContent(children)}
    </>
  );
};

export default CoursePage;
