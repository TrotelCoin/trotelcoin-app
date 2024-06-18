import UserContext from "@/contexts/user";
import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import CountUp from "react-countup";

const AverageMark = ({ lang }: { lang: Lang }) => {
  const { averageMark } = useContext(UserContext);

  return (
    <>
      <div
        className={`flex h-full items-center justify-center rounded-xl border border-gray-900/10 bg-white px-2 py-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <div className="mx-auto flex flex-col text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {averageMark ? (
                  <span>
                    <CountUp start={0} end={averageMark} suffix="/20 🎓" />
                  </span>
                ) : (
                  <span>
                    <span>0/20</span> 🎓
                  </span>
                )}
              </span>
            </>
          </span>
          <span>{lang === "en" ? "Average mark" : "Note moyenne"}</span>
        </div>
      </div>
    </>
  );
};

export default AverageMark;
