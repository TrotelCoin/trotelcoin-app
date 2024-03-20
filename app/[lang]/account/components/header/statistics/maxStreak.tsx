import StreakContext from "@/app/[lang]/contexts/streakContext";
import type { Lang } from "@/types/lang";
import React, { useContext } from "react";

const MaxStreak = ({ lang }: { lang: Lang }) => {
  const { maxStreak } = useContext(StreakContext);

  return (
    <>
      <div
        className={`bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {maxStreak ? (
                  <span>{maxStreak}</span>
                ) : (
                  <span className="animate__animated animate__flash animate__slower animate__infinite">
                    0
                  </span>
                )}
              </span>
            </>
          </span>
          <span>{lang === "en" ? "Max streak" : "Série maximale"}</span>
        </div>
      </div>
    </>
  );
};

export default MaxStreak;
