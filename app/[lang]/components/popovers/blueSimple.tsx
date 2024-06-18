"use client";

import React, { useContext } from "react";
import "animate.css";
import AudioContext from "@/contexts/audio";

const BlueSimplePopover = ({
  children,
  silence
}: {
  children?: React.ReactNode;
  silence?: boolean;
}) => {
  const { playAudio } = useContext(AudioContext);

  const whenClicked = () => {
    if (!silence) {
      playAudio("blueButton");
    }
  };

  return (
    <>
      <button
        onClick={() => {
          whenClicked();
        }}
        className={`flex justify-center rounded-xl border-b-4 border-blue-700 bg-blue-500 px-4 py-2 text-sm font-semibold text-gray-100 backdrop-blur-xl hover:bg-blue-500/80 active:mt-1 active:border-none`}
      >
        {children}
      </button>
    </>
  );
};

export default BlueSimplePopover;
