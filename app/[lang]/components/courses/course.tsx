"use client";

import PremiumContext from "@/contexts/premium";
import lessons from "@/data/lessons/lessons";
import CourseFinishedProvider from "@/providers/courseFinished";
import { Lesson } from "@/types/courses/lessons";
import { getAvailabilityByQuizId } from "@/utils/quizzes/getAvailabilityByQuizId";
import { getTierByQuizId } from "@/utils/quizzes/getTierByquizId";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { useAccount } from "wagmi";
import CourseContent from "@/app/[lang]/components/courses/mainCourse";
import UnauthorizedContent from "@/app/[lang]/components/courses/unauthorizedContent";
import { Lang } from "@/types/language/lang";

const Course = ({
  quizId,
  lang,
  children,
  course,
}: {
  quizId: number;
  lang: Lang;
  children: React.ReactNode;
  course: Lesson;
}) => {
  const pathname = usePathname();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${pathname}`;

  const foundTier = getTierByQuizId(quizId, lessons);
  const foundAvailability = getAvailabilityByQuizId(quizId, lessons);

  const currentCourse: Lesson = lessons
    .flatMap((lesson) => lesson.courses)
    .find((course) => course.quizId.toString() === quizId.toString()) as Lesson;

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

  const { address } = useAccount();

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  const renderUnauthorizedContent = () => {
    return (
      <>
        <UnauthorizedContent lang={lang} />
      </>
    );
  };

  const renderCourseContent = (children: React.ReactNode) => {
    return (
      <>
        {!address && tier !== "Beginner" ? (
          renderUnauthorizedContent()
        ) : !foundAvailability ||
          (tier !== "Beginner" &&
            (((tier === "Intermediate" || tier === "Intermédiaire") &&
              !isIntermediate) ||
              (tier === "Expert" && !isExpert))) ? (
          renderUnauthorizedContent()
        ) : (
          <>
            <CourseFinishedProvider>
              <CourseContent
                lang={lang}
                quizId={quizId}
                title={title}
                URL={URL}
                description={currentCourse?.description[lang]}
              >
                {children}
              </CourseContent>
            </CourseFinishedProvider>
          </>
        )}
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

export default Course;
