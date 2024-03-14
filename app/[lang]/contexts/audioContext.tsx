import React from "react";
import type { Audios } from "@/app/[lang]/providers/audioProvider";

const CourseFinishedContext = React.createContext({
  audioEnabled: true as boolean,
  setAudioEnabled: {} as React.Dispatch<React.SetStateAction<boolean>>,
  playAudio: {} as (key: Audios) => void,
});

export default CourseFinishedContext;
