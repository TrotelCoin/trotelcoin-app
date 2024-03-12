"use client";

import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import AudioContext from "@/app/[lang]/contexts/audioContext";

const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const contextValue = useMemo(
    () => ({
      audioEnabled,
      setAudioEnabled,
    }),
    [audioEnabled, setAudioEnabled]
  );

  return (
    <>
      <AudioContext.Provider value={contextValue}>
        {children}
      </AudioContext.Provider>
    </>
  );
};

export default AudioProvider;
