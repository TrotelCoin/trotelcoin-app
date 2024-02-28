import { DictType } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { Address } from "viem";

const CoursesSatisfaction = ({
  dict,
  quizId,
}: {
  dict: DictType;
  quizId: number;
}) => {
  const [satisfactionMessage, setSatisfactionMessage] =
    useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction] =
    useState<boolean>(false);

  const address = useAddress();

  const postSatisfaction = async (rating: number) => {
    if (rating) {
      const postSatisfaction = await fetch(
        `/api/database/postCoursesSatisfaction?quizId=${quizId}&rating=${rating}&wallet=${address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );

      if (postSatisfaction.status !== 200) {
        setErrorMessage(true);
        return;
      }
    }

    setSatisfactionMessage(true);
    setAlreadyAnsweredSatisfaction(true);
  };

  useEffect(() => {
    const fetchCoursesSatisfactionAnswered = async () => {
      const response = await fetch(
        `/api/database/getCoursesSatisfactionStatus?wallet=${address}&quizId=${quizId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const data = await response.json();
      const { answered } = data;
      if (answered !== false) {
        setAlreadyAnsweredSatisfaction(true);
      }
    };

    if (address && quizId) {
      fetchCoursesSatisfactionAnswered();
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
  }, [address, quizId]);

  return (
    <>
      {(address as Address) && !alreadyAnsweredSatisfaction && (
        <div className="mt-10 mx-auto border-t border-gray-900/10 dark:border-gray-100/10 pt-10 flex flex-col">
          <div className="flex items-center">
            {!alreadyAnsweredSatisfaction && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {typeof dict?.lesson !== "string" && (
                    <>{dict?.lesson.satisfaction}</>
                  )}{" "}
                  :
                </h2>
                <div className="flex items-center">
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index} className="ml-1 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => {
                            setRating(ratingValue);
                            postSatisfaction(ratingValue);
                          }}
                          className="hidden"
                        />
                        {ratingValue <= (rating as number) ? (
                          // Filled Star
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-blue-500 dark:text-blue-300"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          // Outline Star
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 hover:text-blue-500 dark:hover:text-blue-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                          </svg>
                        )}
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          {satisfactionMessage && (
            <p className="mt-2 text-green-500 dark:text-green-300 animate__animated animate__fadeIn">
              {typeof dict?.lesson !== "string" && (
                <>{dict?.lesson.satisfactionMessage}</>
              )}
            </p>
          )}
          {errorMessage && (
            <p className="mt-2 text-red-500 dark:text-red-300 animate__animated animate__fadeIn">
              {typeof dict?.lesson !== "string" && (
                <>{dict?.lesson.errorMessage}</>
              )}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default CoursesSatisfaction;
