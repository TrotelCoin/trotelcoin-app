"use client";

import "animate.css";
import { Course, DictType, Lang } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import lessons from "@/data/lessons/lessonsData";
import Quiz from "@/app/[lang]/[quizId]/components/quiz";
import { useAddress } from "@thirdweb-dev/react";
import GoHomeButton from "@/app/[lang]/[quizId]/components/goHomeButton";
import { getDictionary } from "@/app/[lang]/dictionaries";
import CoursesSatisfaction from "@/app/[lang]/[quizId]/components/coursesSatisfaction";
import UnauthorizedContent from "@/app/[lang]/[quizId]/components/unauthorizedContent";
import Disclaimer from "@/app/[lang]/[quizId]/components/disclaimer";
import { getTierByQuizId, getAvailabilityByQuizId } from "@/utils/getByquizId";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { usePathname } from "next/navigation";
import Success from "@/app/[lang]/components/modals/success";
import CountUp from "react-countup";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";

export type CourseFinishedContextType = {
  isCourseFinished: boolean;
  setIsCourseFinished: React.Dispatch<React.SetStateAction<boolean>>;
};

const CourseFinishedContext = createContext<CourseFinishedContextType | null>(
  null
);

const CoursePage = ({
  params: { lang, quizId },
  children,
}: {
  params: { lang: Lang; quizId: number };
  children: React.ReactNode;
}) => {
  const [dict, setDict] = useState<DictType | null>(null);
  const [answered, setAnswered] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isCourseFinished, setIsCourseFinished] = useState<boolean>(false);

  const pathname = usePathname();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${pathname}`;

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const { data: numberOfAnswers } = useSWR(
    quizId ? `/api/database/getCourseNumberOfAnswers?quizId=${quizId}` : null,
    fetcher
  );

  useEffect(() => {
    if (numberOfAnswers) {
      setAnswered(numberOfAnswers);
    }
  }, [numberOfAnswers]);

  const foundTier = getTierByQuizId(quizId, lessons);
  const foundAvailability = getAvailabilityByQuizId(quizId, lessons);

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

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  const coursesProvider = React.useMemo(
    () => ({ isCourseFinished, setIsCourseFinished }),
    [isCourseFinished, setIsCourseFinished]
  );

  const renderUnauthorizedContent = () => {
    return (
      <>
        <UnauthorizedContent dict={dict as DictType} lang={lang} />
      </>
    );
  };

  const renderCourseContent = (children: React.ReactNode) => {
    return (
      <>
        <div className="mx-auto max-w-2xl text-base leading-7 text-gray-900 dark:text-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold leading-7 text-blue-500 dark:text-blue-300">
                {typeof dict?.lesson !== "string" && <>{dict?.lesson.course}</>}
              </p>
              <div className="flex justify-center items-center mx-2 h-6 w-px rounded-full bg-gray-800/20 dark:bg-gray-200/40" />
              <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
                <CountUp start={0} duration={2} end={answered} />{" "}
                {lang === "en" ? "people answered" : "personnes ont répondu"}
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(URL);
                setCopied(true);
              }}
              className="p-2 rounded-full bg-white dark:bg-gray-900 focus:bg-white dark:focus:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z" />
              </svg>
            </button>
          </div>
          <h1 className="my-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {title}
          </h1>

          {/* Disclaimer */}
          <div className="mt-4">
            <Disclaimer dict={dict as DictType} />
          </div>

          {/* Course */}
          <div className="flex justify-start">
            <CourseFinishedContext.Provider value={coursesProvider}>
              {children}
            </CourseFinishedContext.Provider>
          </div>

          {isCourseFinished && (
            <>
              <div className="mt-10">
                <CoursesSatisfaction dict={dict as DictType} quizId={quizId} />

                <Quiz quizId={quizId} lang={lang} />

                <GoHomeButton lang={lang} />
              </div>
            </>
          )}
        </div>
        <Success
          show={copied}
          onClose={() => setCopied(false)}
          lang={lang}
          title={lang === "en" ? "Share" : "Partagez"}
          message={
            lang === "en"
              ? "The address has been copied, you can now share the URL."
              : "L'adresse a été copiée, vous pouvez maintenant partager l'URL."
          }
        />
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
              !isIntermediate) ||
              (tier === "Expert" && !isExpert)))
        ? renderUnauthorizedContent()
        : renderCourseContent(children)}
    </>
  );
};

export const useCourseFinished = () => {
  const context = useContext(CourseFinishedContext);

  return context;
};

export default CoursePage;
