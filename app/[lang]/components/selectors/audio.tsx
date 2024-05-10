"use client";

import React, { useContext, useEffect, useState } from "react";
import AudioContext from "@/contexts/audio";
import BlueSimpleButton from "@/app/[lang]/components/buttons/blueSimple";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";

const AudioSelector = () => {
  const [enabled, setEnabled] = useState<boolean>(true);

  const { audioEnabled, setAudioEnabled } = useContext(AudioContext);

  useEffect(() => {
    setEnabled(audioEnabled);
  }, [audioEnabled]);

  return (
    <>
      {enabled ? (
        <BlueSimpleButton silence={true} onClick={() => setAudioEnabled(false)}>
          <SpeakerWaveIcon className="h-5 w-5" />
        </BlueSimpleButton>
      ) : (
        <BlueSimpleButton onClick={() => setAudioEnabled(true)}>
          <SpeakerXMarkIcon className="h-5 w-5" />
        </BlueSimpleButton>
      )}
    </>
  );
};

export default AudioSelector;
