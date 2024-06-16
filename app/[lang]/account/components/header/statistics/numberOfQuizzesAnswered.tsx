import UserContext from "@/contexts/user";
import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import CountUp from "react-countup";

const NumberOfQuizzesAnswered = ({ lang }: { lang: Lang }) => {
  const { userNumberOfQuizzesAnswered: numberOfQuizzesAnswered } =
    useContext(UserContext);

  return (
    <>
      <div
        className={`bg-white h-full flex items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {numberOfQuizzesAnswered ? (
                  <span>
                    <CountUp
                      start={0}
                      end={numberOfQuizzesAnswered}
                      suffix=" 📚"
                    />
                  </span>
                ) : (
                  <span>
                    <span>0</span> 📚
                  </span>
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
