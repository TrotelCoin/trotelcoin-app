import React from "react";

const CourseFinishedContext = React.createContext({
  audioEnabled: true as boolean,
  setAudioEnabled: {} as React.Dispatch<React.SetStateAction<boolean>>,
});

export default CourseFinishedContext;
