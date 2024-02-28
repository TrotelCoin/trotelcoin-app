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
          <p className="text-base font-semibold leading-7 text-blue-500 dark:text-blue-300">
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
