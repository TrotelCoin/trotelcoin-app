import React, { useContext } from "react";
import CourseFinishedContext from "@/app/[lang]/contexts/courseFinishedContext";
import type { Lang } from "@/types/lang";
import CoursesSatisfaction from "@/app/[lang]/[quizId]/components/coursesSatisfaction";
import Quiz from "@/app/[lang]/[quizId]/components/quiz";
import GoHomeButton from "@/app/[lang]/[quizId]/components/goHomeButton";

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
