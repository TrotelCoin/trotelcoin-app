import { DictType } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";

const NumberOfQuizzesAnswered = ({ dict }: { dict: DictType }) => {
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);

  const address = useAddress();

  useEffect(() => {
    const fetchNumberOfQuizzesAnswered = async () => {
      await fetch(`/api/database/numberOfQuizzesAnswered?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
        .then((response) => response?.json())
        .then((data) => {
          setNumberOfQuizzesAnswered(data);
        });
    };

    if (address) {
      fetchNumberOfQuizzesAnswered();

      const interval = setInterval(fetchNumberOfQuizzesAnswered, 10000);

      return () => clearInterval(interval);
    } else {
      setNumberOfQuizzesAnswered(0);
    }
  }, [address]);

  return (
    <>
      <div
        className={`bg-gray-100 flex items-center border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 text-center rounded-lg px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col mx-auto text-center">
          <span className="text-2xl md:text-4xl">
            <>
              <span className="font-semibold">
                {numberOfQuizzesAnswered ? (
                  <span>{numberOfQuizzesAnswered}</span>
                ) : (
                  <span className="animate__animated animate__flash animate__slower animate__infinite">
                    0
                  </span>
                )}
              </span>
            </>
          </span>
          <span>
            {typeof dict?.account !== "string" && (
              <>{dict?.account.quizzesAnswered}</>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default NumberOfQuizzesAnswered;
