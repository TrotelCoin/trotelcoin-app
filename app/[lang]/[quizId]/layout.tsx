"use client";

import "animate.css";
import { Course, DictType, Lang } from "@/types/types";
import React, { useEffect, useState } from "react";
import lessons from "@/data/lessonsData";
import Link from "next/link";
import Quiz from "@/app/[lang]/components/quiz";
import { Address, useContractRead } from "wagmi";
import { useAddress } from "@thirdweb-dev/react";
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
  const [satisfactionMessage, setSatisfactionMessage] =
    useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const foundTier = getTierByQuizId(quizId);
  const foundAvailability = getAvailabilityByQuizId(quizId);

  const postSatisfaction = async (rating: number) => {
    if (rating) {
      const postSatisfaction = await fetch(
        `/api/database/coursesSatisfaction?quizId=${quizId}&rating=${rating}&wallet=${address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (postSatisfaction.status !== 200) {
        setErrorMessage(true);
        return;
      }
    }

    setSatisfactionMessage(true);
    setAlreadyAnsweredSatisfaction(true);
  };

  const currentCourse: Course = lessons
    .flatMap((lesson) => lesson.courses)
    .find((course) => course.quizId.toString() === quizId.toString()) as Course;

  let tier = "";
  let title = "";

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

  const address = useAddress();

  useEffect(() => {
    const fetchCoursesSatisfactionAnswered = async () => {
      const response = await fetch(
        `/api/database/coursesSatisfactionAnswered?wallet=${address}&quizId=${quizId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const data = await response.json();
      const { answered } = data;
      if (answered !== false) {
        setAlreadyAnsweredSatisfaction(true);
      }
    };

    if (address && quizId) {
      fetchCoursesSatisfactionAnswered();
    }
  }, [address, quizId]);

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
                className="rounded-md bg-black dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-100 dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
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
          <p className="text-base font-semibold leading-7 text-yellow-500 dark:text-yellow-300">
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
          <div className="bg-gray-50 my-10 border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 rounded-lg px-10 py-2 dark:bg-gray-900">
            <ul
              role="list"
              className="max-w-xl space-y-8 text-gray-700 dark:text-gray-300"
            >
              <div className="grid grid-cols-1 divide-y divide-gray-900/20 dark:divide-gray-100/40">
                <div className="py-4">
                  <li className="flex gap-x-3">
                    <span className="text-gray-900 dark:text-gray-100">
                      {lang == "en" && <>{currentCourse?.one.en}</>}
                      {lang == "fr" && <>{currentCourse?.one.fr}</>}
                    </span>
                  </li>
                </div>
                <div className="py-4">
                  <li className="flex gap-x-3">
                    <span className="text-gray-900 dark:text-gray-100">
                      {lang == "en" && <>{currentCourse?.two.en}</>}
                      {lang == "fr" && <>{currentCourse?.two.fr}</>}
                    </span>
                  </li>
                </div>
                <div className="py-4">
                  <li className="flex gap-x-3">
                    <span className="text-gray-900 dark:text-gray-100">
                      {lang == "en" && <>{currentCourse?.three.en}</>}
                      {lang == "fr" && <>{currentCourse?.three.fr}</>}
                    </span>
                  </li>
                </div>
              </div>
            </ul>
          </div>
          <>{children}</>

          {/* Satisfaction */}
          {(address as Address) && !alreadyAnsweredSatisfaction && (
            <div className="mt-10 mx-auto border-t border-gray-900/20 dark:border-gray-100/40 pt-10 flex flex-col">
              <div className="flex items-center">
                {!alreadyAnsweredSatisfaction && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {typeof dict?.lesson !== "string" && (
                        <>{dict?.lesson.satisfaction}</>
                      )}{" "}
                      :
                    </h2>
                    <div className="flex items-center">
                      {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                          <label key={index} className="ml-1 cursor-pointer">
                            <input
                              type="radio"
                              name="rating"
                              value={ratingValue}
                              onClick={() => {
                                setRating(ratingValue);
                                postSatisfaction(ratingValue);
                              }}
                              className="hidden"
                            />
                            {ratingValue <= (rating as number) ? (
                              // Filled Star
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-yellow-500 dark:text-yellow-300"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              // Outline Star
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 hover:text-yellow-500 dark:hover:text-yellow-300"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                              </svg>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              {satisfactionMessage && (
                <p className="mt-2 text-green-500 dark:text-green-300 animate__animated animate__fadeIn">
                  {typeof dict?.lesson !== "string" && (
                    <>{dict?.lesson.satisfactionMessage}</>
                  )}
                </p>
              )}
              {errorMessage && (
                <p className="mt-2 text-red-500 dark:text-red-300 animate__animated animate__fadeIn">
                  {typeof dict?.lesson !== "string" && (
                    <>{dict?.lesson.errorMessage}</>
                  )}
                </p>
              )}
            </div>
          )}

          {/* Quizz */}
          <Quiz quizId={quizId} lang={lang} />

          {/* Go Home */}
          <GoHomeButton lang={lang} />
        </div>
      </>
    );
  };

  return (
    <>
      {!address && tier !== "Beginner"
        ? renderUnauthorizedContent()
        : !foundAvailability ||
          (tier !== "Beginner" &&
            (((tier === "Intermediate" || tier === "Intermédiaire") &&
              intermediateBalance < 1) ||
              (tier === "Expert" && expertBalance < 1)))
        ? renderUnauthorizedContent()
        : renderCourseContent(children)}
    </>
  );
};

export default CoursePage;
