import UserContext from "@/contexts/user";
import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import CountUp from "react-countup";

const LearningTime = ({ lang }: { lang: Lang }) => {
  const { learningTime } = useContext(UserContext);

  return (
    <>
      <div
        className={`flex h-full items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <div className="mx-auto flex flex-col text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {learningTime ? (
                  <span>
                    <CountUp
                      start={0}
                      end={Math.floor((learningTime * 1e-3) / 60)}
                      suffix="m ⏳"
                    />
                  </span>
                ) : (
                  <span>
                    <span>0</span>m ⏳
                  </span>
                )}
              </span>
            </>
          </span>
          <span>
            {lang === "en" ? "Learning time" : "Temps d'apprentissage"}
          </span>
        </div>
      </div>
    </>
  );
};

export default LearningTime;
