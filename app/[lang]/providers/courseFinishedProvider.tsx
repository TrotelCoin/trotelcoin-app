import React, { useMemo, useState } from "react";
import CourseFinishedContext from "@/app/[lang]/contexts/courseFinishedContext";

const CourseFinishedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCourseFinished, setIsCourseFinished] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      isCourseFinished,
      setIsCourseFinished,
    }),
    [isCourseFinished, setIsCourseFinished]
  );

  return (
    <>
      <CourseFinishedContext.Provider value={contextValue}>
        {children}
      </CourseFinishedContext.Provider>
    </>
  );
};

export default CourseFinishedProvider;
