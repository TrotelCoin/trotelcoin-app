import { DictType, Lang } from "@/types/types";
import React, { useEffect, useState } from "react";

const Satisfaction = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
  const [alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction] =
    useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const satisfactionResult = async (number: number) => {
    if (number) {
      await fetch(`/api/database/satisfactionHandler?number=${number}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      localStorage.setItem("satisfactionAnswered", "true");
      setAlreadyAnsweredSatisfaction(true);
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("satisfactionAnswered") === null) {
      localStorage.setItem("satisfactionAnswered", "false");
    } else {
      setAlreadyAnsweredSatisfaction(
        localStorage.getItem("satisfactionAnswered") === "true"
      );
    }
  }, []);

  return (
    <>
      <div
        className={`col-span-2 md:col-span-4 bg-gray-50 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg p-8 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${
          alreadyAnsweredSatisfaction &&
          "hidden animate__animated animate__fadeOut"
        }`}
      >
        <div className="flex flex-col gap-4 mx-auto text-center">
          {typeof dict?.account !== "string" && (
            <span className="text-xl font-semibold">
              {dict?.account.satisfaction as string}
            </span>
          )}
          <div className="grid grid-cols-6 lg:grid-cols-11 gap-2 mx-auto mt-2">
            {Array.from(Array(11).keys()).map((number, index) => (
              <div key={index}>
                <div
                  onClick={() => setSelectedNumber(number)}
                  className={`m-1 w-10 h-10 rounded-lg ${
                    selectedNumber === number
                      ? "bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-gray-100 dark:text-gray-900"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                  } cursor-pointer text-xl flex items-center justify-center`}
                >
                  {number}
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 mx-auto">
            <button
              onClick={() => satisfactionResult(selectedNumber as number)}
              className="mt-2 text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
            >
              {lang === "en" ? <>Submit</> : <>Envoyer</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Satisfaction;
