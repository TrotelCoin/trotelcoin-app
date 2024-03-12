import BlueButton from "@/app/[lang]/components/blueButton";
import { DictType, Lang } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Satisfaction = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
  const [alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction] =
    useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isResultLoading, setIsResultLoading] = useState<boolean>(false);

  const satisfactionResult = async (number: number) => {
    setIsResultLoading(true);
    if (number) {
      await axios
        .post(`/api/database/postUserSatisfaction?number=${number}`)
        .catch((error) => {
          console.error(error);
        });

      localStorage.setItem("satisfactionAnswered", "true");
      setAlreadyAnsweredSatisfaction(true);
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
    setIsResultLoading(false);
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
        className={`col-span-2 md:col-span-4 bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl p-8 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
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
                  className={`m-1 w-10 h-10 rounded-xl ${
                    selectedNumber === number
                      ? "bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
                      : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                  } cursor-pointer text-xl flex items-center justify-center`}
                >
                  {number}
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-2">
            <BlueButton
              lang={lang}
              onClick={() => satisfactionResult(selectedNumber as number)}
              isLoading={isResultLoading}
              text={lang === "en" ? "Submit" : "Envoyer"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Satisfaction;
