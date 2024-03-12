import React, { useContext, useRef } from "react";
import "animate.css";
import { Lang } from "@/types/types";
import AudioContext from "@/app/[lang]/contexts/audioContext";

const BlueButton = ({
  text,
  onClick,
  isLoading,
  isFull,
  lang,
  disabled,
}: {
  text: string;
  onClick: Function;
  isLoading?: boolean;
  isFull?: boolean;
  lang?: Lang;
  disabled?: boolean;
}) => {
  const { audioEnabled } = useContext(AudioContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const whenClicked = () => {
    playAudio();
    onClick();
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/sounds/blue-button.wav" />
      <button
        type="button"
        onClick={() => whenClicked()}
        className={`flex border-b-4 active:border-none active:mt-1 text-sm font-semibold justify-center rounded-xl text-gray-100 backdrop-blur-xl px-6 py-2 ${
          disabled
            ? "bg-gray-500 hover:bg-gray-500/80 border-gray-700 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-500/80 border-blue-700"
        } ${isFull && "w-full"}`}
      >
        <span
          className={`${
            isLoading &&
            "animate__animated animate__flash animate__slower animate__infinite"
          }`}
        >
          {isLoading ? (lang === "en" ? "Loading..." : "Chargement...") : text}
        </span>
      </button>
    </>
  );
};

export default BlueButton;
