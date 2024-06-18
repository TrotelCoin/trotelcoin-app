"use client";

import React, { useContext } from "react";
import "animate.css";
import type { Lang } from "@/types/language/lang";
import AudioContext from "@/contexts/audio";
import Confetti from "react-dom-confetti";
import { loadingFlashClass } from "@/style/loading";

const WhiteButton = ({
  text,
  onClick,
  isLoading,
  isFull,
  lang,
  disabled,
  showConfetti
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
        className={`rounded-xl border-b-4 px-6 py-2 text-center text-sm font-semibold text-gray-900 backdrop-blur-xl active:mt-1 active:border-none ${
          disabled
            ? "cursor-not-allowed border-gray-700 bg-gray-500 hover:bg-gray-500/80"
            : "border-gray-400 bg-gray-200 hover:bg-gray-200/80"
        } ${isFull && "w-full"}`}
      >
        <span className={`text-center ${isLoading && loadingFlashClass}`}>
          {isLoading ? (lang === "en" ? "Loading..." : "Chargement...") : text}
        </span>
        <div className="mx-auto flex items-center justify-center">
          <Confetti active={showConfetti as boolean} />
        </div>
      </button>
    </>
  );
};

export default WhiteButton;
