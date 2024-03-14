"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import AudioContext from "@/app/[lang]/contexts/audioContext";

export type Audios =
  | "badAnswer"
  | "goodAnswer"
  | "blueButton"
  | "courseFinished"
  | "failModal"
  | "successModal"
  | "potion"
  | "claimedRewards";

const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("audioEnabled");
      return saved ? JSON.parse(saved) : true;
    } else {
      return true;
    }
  });

  const audioRefs = {
    badAnswer: useRef<HTMLAudioElement>(null),
    goodAnswer: useRef<HTMLAudioElement>(null),
    blueButton: useRef<HTMLAudioElement>(null),
    courseFinished: useRef<HTMLAudioElement>(null),
    failModal: useRef<HTMLAudioElement>(null),
    successModal: useRef<HTMLAudioElement>(null),
    potion: useRef<HTMLAudioElement>(null),
    claimedRewards: useRef<HTMLAudioElement>(null),
  };

  const playAudio = (key: keyof typeof audioRefs) => {
    const audioRef = audioRefs[key];
    if (audioEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    localStorage.setItem("audioEnabled", JSON.stringify(audioEnabled));
  }, [audioEnabled]);

  const contextValue = useMemo(
    () => ({
      audioEnabled,
      setAudioEnabled,
      playAudio,
    }),
    [audioEnabled, setAudioEnabled, playAudio]
  );

  return (
    <AudioContext.Provider value={contextValue}>
      <audio ref={audioRefs["badAnswer"]} src="/audio/sounds/bad-answer.wav" />
      <audio
        ref={audioRefs["goodAnswer"]}
        src="/audio/sounds/good-answer.wav"
      />
      <audio
        ref={audioRefs["blueButton"]}
        src="/audio/sounds/blue-button.wav"
      />
      <audio
        ref={audioRefs["courseFinished"]}
        src="/audio/sounds/course-finished.wav"
      />
      <audio ref={audioRefs["failModal"]} src="/audio/sounds/fail-modal.wav" />
      <audio
        ref={audioRefs["successModal"]}
        src="/audio/sounds/success-modal.wav"
      />
      <audio ref={audioRefs["potion"]} src="/audio/sounds/potion.wav" />
      <audio
        ref={audioRefs["claimedRewards"]}
        src="/audio/sounds/claimed-rewards.wav"
      />

      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
