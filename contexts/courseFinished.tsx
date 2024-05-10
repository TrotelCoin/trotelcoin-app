import React from "react";

const CourseFinishedContext = React.createContext({
  isCourseFinished: false as boolean,
  setIsCourseFinished: {} as React.Dispatch<React.SetStateAction<boolean>>,
});

export default CourseFinishedContext;
