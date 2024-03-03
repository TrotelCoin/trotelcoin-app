"use client";

import "animate.css";
import { Course, DictType, Lang } from "@/types/types";
import React, { useContext, useEffect, useState } from "react";
import lessons from "@/data/lessons/lessonsData";
import Quiz from "@/app/[lang]/[quizId]/components/quiz";
import { useAddress } from "@thirdweb-dev/react";
import GoHomeButton from "@/app/[lang]/[quizId]/components/goHomeButton";
import { getDictionary } from "@/app/[lang]/dictionaries";
import CoursesSatisfaction from "@/app/[lang]/[quizId]/components/coursesSatisfaction";
import UnauthorizedContent from "@/app/[lang]/[quizId]/components/unauthorizedContent";
import Disclaimer from "@/app/[lang]/[quizId]/components/disclaimer";
import CurrentCourse from "@/app/[lang]/[quizId]/components/currentCourse";
import { getTierByQuizId, getAvailabilityByQuizId } from "@/utils/getByquizId";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { usePathname } from "next/navigation";
import Success from "@/app/[lang]/components/modals/success";
import CountUp from "react-countup";

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

  useEffect(() => {
    const fetchNumberOfAnswers = async () => {
      await fetch(`/api/database/getCourseNumberOfAnswers?quizId=${quizId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          setAnswered(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchNumberOfAnswers();
  }, []);

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
                <CountUp
                  start={0}
                  duration={2}
                  end={answered.toLocaleString("en-US")}
                />{" "}
                {lang === "en" ? "people did it" : "personnes l'on fait"}
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
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-gray-900 dark:text-gray-100">
            {typeof dict?.lesson !== "string" && (
              <>{dict?.lesson.goingToLearn}</>
            )}
          </p>

          {/* Current course */}
          <CurrentCourse lang={lang} currentCourse={currentCourse} />

          {/* Disclaimer */}
          <Disclaimer dict={dict as DictType} />

          {/* Course */}
          <div className="whitespace-normal break-words">{children}</div>

          {/* Satisfaction */}
          <CoursesSatisfaction dict={dict as DictType} quizId={quizId} />

          {/* Quizz */}
          <Quiz quizId={quizId} lang={lang} />

          {/* Go Home */}
          <GoHomeButton lang={lang} />
        </div>
        <Success
          show={copied}
          onClose={() => setCopied(false)}
          lang={lang}
          title={lang === "en" ? "Share" : "Partage"}
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

export default CoursePage;
