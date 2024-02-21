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

    const interval = setInterval(fetchNumberOfQuizzesAnswered, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {" "}
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {numberOfQuizzesAnswered ? (
            <>
              {Math.floor(numberOfQuizzesAnswered)}{" "}
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
