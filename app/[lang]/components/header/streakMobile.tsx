import { DictType, Lang } from "@/types/types";
import React, { useContext } from "react";
import StreakContext from "@/app/[lang]/contexts/streakContext";
import { useAddress } from "@thirdweb-dev/react";
import { Address } from "viem";
import "animate.css";

const StreakMobile = ({ lang, dict }: { lang: Lang; dict: DictType }) => {
  const address = useAddress();

  const { streak, disabled, updateStreak, cooldown, isStreakLoading } =
    useContext(StreakContext);

  return (
    <>
      <div className="flex flex-col border border-gray-900/10 dark:border-gray-100/10 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10">
        <div className="flex gap-2 items-center justify-between p-4">
          <h3>{lang === "en" ? "Your streak" : "Votre série"}</h3>
          <div className="flex gap-2 items-center">
            <span>{cooldown}</span>
            <div className="border-r border-gray-900/10 dark:border-gray-100/10 h-6" />
            <span>{streak} 🔥</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 p-4">
          <button
            disabled={disabled}
            onClick={() => {
              if (address) {
                updateStreak(address as Address);
              }
            }}
            className={`w-full ${
              !disabled && address
                ? "bg-blue-500 hover:bg-blue-400 text-gray-100"
                : "bg-gray-500 text-gray-100"
            } hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 text-sm px-6 py-2  rounded-xl font-semibold ${
              (disabled || !address) && "cursor-not-allowed"
            }`}
          >
            {isStreakLoading ? (
              <span className="animate__animated animate__flash animate__infinite animate__slower">
                {lang === "en" ? "Loading..." : "Chargement..."}
              </span>
            ) : !address ? (
              <>
                {lang === "en" ? "Please, log in" : "Veuillez vous connecter"}
              </>
            ) : disabled ? (
              <>{lang === "en" ? "Come back tomorrow" : "Revenez demain"}</>
            ) : (
              <>
                {typeof dict?.header !== "string" && (
                  <>{dict?.header.streakButton}</>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default StreakMobile;
