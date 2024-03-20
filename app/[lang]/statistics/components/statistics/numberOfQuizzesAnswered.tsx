import type { Lang } from "@/types/lang";
import React from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const NumberOfQuizzesAnswered = ({ lang }: { lang: Lang }) => {
  const { data: numberOfQuizzesAnswered } = useSWR(
    "/api/database/getTotalNumberOfQuizzesAnswered",
    fetcher
  );

  return (
    <>
      {" "}
      <div
        className={`bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {numberOfQuizzesAnswered ? (
            <>
              {Math.floor(numberOfQuizzesAnswered).toLocaleString("en-US")}{" "}
              <span className="hidden md:inline">📚</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
              0 <span className="hidden md:inline">📚</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Quizzes answered" : "Quiz répondus"}</span>
      </div>
    </>
  );
};

export default NumberOfQuizzesAnswered;
