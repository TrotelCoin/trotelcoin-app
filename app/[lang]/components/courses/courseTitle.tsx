import React, { useContext } from "react";
import CourseFinishedContext from "@/contexts/courseFinished";

const CourseTitle = ({ title }: { title: string }) => {
  const { isCourseFinished } = useContext(CourseFinishedContext);

  return (
    <>
      <h1
        className={`my-2 text-3xl font-bold tracking-tight ${
          isCourseFinished ? "rainbow-text" : "text-gray-900 dark:text-gray-100"
        } sm:text-4xl`}
      >
        {title}
      </h1>
    </>
  );
};

export default CourseTitle;
