import React, { useContext } from "react";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";

const AudioSelector = () => {
  const { audioEnabled, setAudioEnabled } = useContext(AudioContext);

  return (
    <>
      {audioEnabled ? (
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
