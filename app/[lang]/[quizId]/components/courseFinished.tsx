import React, { useContext } from "react";
import CourseFinishedContext from "@/app/[lang]/contexts/courseFinishedContext";
import { DictType, Lang } from "@/types/types";
import CoursesSatisfaction from "@/app/[lang]/[quizId]/components/coursesSatisfaction";
import Quiz from "@/app/[lang]/[quizId]/components/quiz";
import GoHomeButton from "@/app/[lang]/[quizId]/components/goHomeButton";

const CourseFinished = ({
  lang,
  dict,
  quizId,
}: {
  lang: Lang;
  dict: DictType;
  quizId: number;
}) => {
  const { isCourseFinished } = useContext(CourseFinishedContext);

  return (
    <>
      {isCourseFinished && (
        <>
          <div className="mt-10">
            <CoursesSatisfaction dict={dict as DictType} quizId={quizId} />

            <Quiz quizId={quizId} lang={lang} />

            <GoHomeButton lang={lang} />
          </div>
        </>
      )}
    </>
  );
};

export default CourseFinished;
