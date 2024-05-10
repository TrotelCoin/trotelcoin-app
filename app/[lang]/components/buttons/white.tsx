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
        className={`text-center border-b-4 active:border-none active:mt-1 text-sm font-semibold rounded-xl text-gray-900 backdrop-blur-xl px-6 py-2 ${
          disabled
            ? "bg-gray-500 hover:bg-gray-500/80 border-gray-700 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-200/80 border-gray-400"
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

export default WhiteButton;
