import UserContext from "@/app/[lang]/contexts/userContext";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import type { Lang } from "@/types/lang";
import React, { useContext } from "react";
import CountUp from "react-countup";

const NumberOfQuizzesAnswered = ({ lang }: { lang: Lang }) => {
  const { userNumberOfQuizzesAnswered: numberOfQuizzesAnswered } =
    useContext(UserContext);

  return (
    <>
      <div
        className={`bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {numberOfQuizzesAnswered ? (
                  <span>
                    <CountUp start={0} end={numberOfQuizzesAnswered} />
                  </span>
                ) : (
                  <span className={`${loadingFlashClass}`}>0</span>
                )}
              </span>
            </>
          </span>
          <span>{lang === "en" ? "Quizzes answered" : "Quiz répondus"}</span>
        </div>
      </div>
    </>
  );
};

export default NumberOfQuizzesAnswered;
