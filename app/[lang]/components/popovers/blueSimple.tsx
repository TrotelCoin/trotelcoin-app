"use client";

import React, { useContext } from "react";
import "animate.css";
import AudioContext from "@/contexts/audio";

const BlueSimplePopover = ({
  children,
  silence,
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
        className={`flex bg-blue-500 hover:bg-blue-500/80 border-blue-700 border-b-4 active:border-none active:mt-1 text-sm font-semibold justify-center rounded-xl text-gray-100 backdrop-blur-xl px-4 py-2`}
      >
        {children}
      </button>
    </>
  );
};

export default BlueSimplePopover;
