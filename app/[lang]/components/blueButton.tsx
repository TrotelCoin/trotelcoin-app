import React from "react";
import "animate.css";
import { Lang } from "@/types/types";

const BlueButton = ({
  text,
  onClick,
  children,
  isLoading,
  isFull,
  lang,
  disabled,
}: {
  text: string;
  onClick: Function;
  children?: JSX.Element;
  isLoading?: boolean;
  isFull?: boolean;
  lang?: Lang;
  disabled?: boolean;
}) => {
  return (
    <>
      <button
        type="button"
        onClick={() => onClick()}
        className={`flex border-b-4  active:border-none active:mt-1 text-sm font-semibold justify-center rounded-xl text-gray-100 backdrop-blur-xl px-6 py-2 ${
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
