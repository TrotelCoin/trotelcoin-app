import React, { useContext } from "react";
import CourseFinishedContext from "@/contexts/courseFinished";
import type { Lang } from "@/types/language/lang";
import CoursesSatisfaction from "@/app/[lang]/components/courses/satisfaction/coursesSatisfaction";
import Quiz from "@/app/[lang]/components/courses/quiz/quiz";
import GoHomeButton from "@/app/[lang]/components/buttons/goHome";

const CourseFinished = ({
  lang,
  quizId,
  startTime,
}: {
  lang: Lang;
  quizId: number;
  startTime: number;
}) => {
  const { isCourseFinished } = useContext(CourseFinishedContext);

  return (
    <>
      {isCourseFinished && (
        <>
          <div className="mt-10">
            <CoursesSatisfaction lang={lang} quizId={quizId} />

            <Quiz quizId={quizId} lang={lang} startTime={startTime} />

            <GoHomeButton lang={lang} />
          </div>
        </>
      )}
    </>
  );
};

export default CourseFinished;
