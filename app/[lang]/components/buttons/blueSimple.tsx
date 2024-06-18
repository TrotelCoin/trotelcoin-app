"use client";

import React, { useContext } from "react";
import "animate.css";
import AudioContext from "@/contexts/audio";

const BlueSimpleButton = ({
  onClick,
  children,
  silence,
  disabled,
  isRoundedFull
}: {
  onClick: Function;
  children?: React.ReactNode;
  silence?: boolean;
  disabled?: boolean;
  isRoundedFull?: boolean;
}) => {
  const { playAudio } = useContext(AudioContext);

  const whenClicked = () => {
    if (!silence) {
      playAudio("blueButton");
    }

    onClick();
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          whenClicked();
        }}
        className={`flex ${
          disabled
            ? "border-gray-700 bg-gray-500"
            : "border-blue-700 bg-blue-500 hover:bg-blue-500/80"
        } justify-center border-b-4 text-sm font-semibold active:mt-1 active:border-none ${
          isRoundedFull ? "rounded-full" : "rounded-xl"
        } px-4 py-2 text-gray-100 backdrop-blur-xl`}
      >
        {children}
      </button>
    </>
  );
};

export default BlueSimpleButton;
