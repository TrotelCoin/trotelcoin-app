"use client";

import React, { useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";
import AudioContext from "@/app/[lang]/contexts/audioContext";

const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("audioEnabled");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("audioEnabled", JSON.stringify(audioEnabled));
  }, [audioEnabled]);

  const contextValue = useMemo(
    () => ({
      audioEnabled,
      setAudioEnabled,
    }),
    [audioEnabled, setAudioEnabled]
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
