import React, { useContext } from "react";
import "animate.css";
import AudioContext from "@/app/[lang]/contexts/audioContext";

const BlueSimpleButton = ({
  onClick,
  children,
  silence,
  disabled,
  isRoundedFull,
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
            ? "bg-gray-500 border-gray-700"
            : "bg-blue-500 hover:bg-blue-500/80 border-blue-700"
        }  border-b-4 active:border-none active:mt-1 text-sm font-semibold justify-center ${
          isRoundedFull ? "rounded-full" : "rounded-xl"
        } text-gray-100 backdrop-blur-xl px-4 py-2`}
      >
        {children}
      </button>
    </>
  );
};

export default BlueSimpleButton;
