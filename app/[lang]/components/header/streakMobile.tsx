import { DictType, Lang } from "@/types/types";
import React, { useContext } from "react";
import StreakContext from "@/app/[lang]/contexts/streakContext";
import { useAddress } from "@thirdweb-dev/react";
import { Address } from "viem";

const StreakMobile = ({
  lang,
  dict,
  setMobileMenuOpen,
}: {
  lang: Lang;
  dict: DictType;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  const address = useAddress();

  const { streak, disabled, updateStreak, cooldown } =
    useContext(StreakContext);

  return (
    <>
      <div className="flex flex-col border border-gray-900/10 dark:border-gray-100/10 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10">
        <div className="flex gap-2 items-center justify-between p-4">
          <h3>Streak</h3>
          <div className="flex gap-2 items-center">
            <span>{cooldown}</span>
            <span>|</span>
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
              !disabled
                ? "bg-blue-500 hover:bg-blue-400 dark:bg-blue-300 dark:hover:bg-blue-400 text-gray-100 dark:text-gray-900"
                : "bg-gray-500 text-gray-100"
            } hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2  rounded-xl font-semibold ${
              disabled && "cursor-not-allowed"
            }`}
          >
            {disabled ? (
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
