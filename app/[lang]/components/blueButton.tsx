import React, { useContext, useRef } from "react";
import "animate.css";
import type { Lang } from "@/types/lang";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import Confetti from "react-dom-confetti";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const BlueButton = ({
  text,
  onClick,
  isLoading,
  isFull,
  lang,
  disabled,
  showConfetti,
}: {
  text: string;
  onClick: Function;
  isLoading?: boolean;
  isFull?: boolean;
  lang: Lang;
  disabled?: boolean;
  showConfetti?: boolean;
}) => {
  const { playAudio } = useContext(AudioContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const whenClicked = () => {
    playAudio("blueButton");
    onClick();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => whenClicked()}
        disabled={disabled}
        className={`text-center border-b-4 active:border-none active:mt-1 text-sm font-semibold rounded-xl text-gray-100 backdrop-blur-xl px-6 py-2 ${
          disabled
            ? "bg-gray-500 hover:bg-gray-500/80 border-gray-700 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-500/80 border-blue-700"
        } ${isFull && "w-full"}`}
      >
        <span className={`text-center ${isLoading && loadingFlashClass}`}>
          {isLoading ? (lang === "en" ? "Loading..." : "Chargement...") : text}
        </span>
        <div className="flex justify-center items-center mx-auto">
          <Confetti active={showConfetti as boolean} />
        </div>
      </button>
    </>
  );
};

export default BlueButton;
