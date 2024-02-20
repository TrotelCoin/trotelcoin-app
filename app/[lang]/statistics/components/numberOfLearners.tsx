import { DictType } from "@/types/types";
import React, { useEffect, useState } from "react";

const NumberOfLearners = ({ dict }: { dict: DictType }) => {
  const [numberOfLearners, setNumberOfLearners] = useState<number | null>(null);

  useEffect(() => {
    // finding number of learners by taking max id in the table "learners"

    const fetchNumberOfLearners = async () => {
      const response = await fetch("/api/database/numberOfLearners", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const numberOfLearners = await response?.json();
      if (numberOfLearners) {
        setNumberOfLearners(numberOfLearners);
      } else {
        setNumberOfLearners(0);
      }
    };

    fetchNumberOfLearners();

    const interval = setInterval(fetchNumberOfLearners, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {numberOfLearners ? (
            <>
              {numberOfLearners} <span className="hidden md:inline">👨‍💻</span>
            </>
          ) : (
            <span className="animate__animated animate__flash animate__slower animate__infinite">
              0 <span className="hidden md:inline">👨‍💻</span>
            </span>
          )}
        </span>

        <span>
          {typeof dict?.algorithm !== "string" && (
            <>{dict?.algorithm.numberOfLearners}</>
          )}
        </span>
      </div>
    </>
  );
};

export default NumberOfLearners;