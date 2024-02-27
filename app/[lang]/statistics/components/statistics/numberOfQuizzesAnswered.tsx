import { DictType } from "@/types/types";
import React, { useEffect, useState } from "react";

const NumberOfQuizzesAnswered = ({ dict }: { dict: DictType }) => {
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchNumberOfQuizzesAnswered = async () => {
      const response = await fetch(
        "/api/database/totalNumberOfQuizzesAnswered",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const numberOfQuizzesAnswered = await response?.json();
      if (numberOfQuizzesAnswered) {
        setNumberOfQuizzesAnswered(numberOfQuizzesAnswered);
      } else {
        setNumberOfQuizzesAnswered(0);
      }
    };

    fetchNumberOfQuizzesAnswered();
  }, []);

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
            <span className="animate__animated animate__flash animate__slower animate__infinite">
              0 <span className="hidden md:inline">📚</span>
            </span>
          )}
        </span>

        <span>
          {typeof dict?.algorithm !== "string" && (
            <>{dict?.algorithm.numberOfQuizzesAnswered}</>
          )}
        </span>
      </div>
    </>
  );
};

export default NumberOfQuizzesAnswered;
