import type { Lang } from "@/types/lang";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import useSWR from "swr";
import axios from "axios";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

const CoursesSatisfaction = ({
  quizId,
  lang,
}: {
  quizId: number;
  lang: Lang;
}) => {
  const [satisfactionMessage, setSatisfactionMessage] =
    useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const { address } = useAccount();

  const postSatisfaction = (rating: number) => {
    if (rating) {
      axios
        .post(
          `/api/database/postCoursesSatisfaction?quizId=${quizId}&rating=${rating}&wallet=${address}`
        )
        .catch((error) => {
          console.error(error);
          setErrorMessage(true);
        });
    }

    setSatisfactionMessage(true);
  };

  const { data: coursesSatisfactionAnswered, error } = useSWR(
    address && quizId
      ? `/api/database/getCoursesSatisfactionStatus?wallet=${address}&quizId=${quizId}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (error) {
      setErrorMessage(true);
    }
  }, [error]);

  return (
    <>
      {(address as Address) && !coursesSatisfactionAnswered?.answered && (
        <div className="mx-auto border-t border-gray-900/10 dark:border-gray-100/10 py-10 flex flex-col">
          <div className="flex items-center">
            {!coursesSatisfactionAnswered?.answered && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {lang === "en" ? "Rate this course:" : "Notez ce cours:"}
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
                          <StarIconSolid className="w-5 h-5 text-blue-500 dark:text-blue-300" />
                        ) : (
                          // Outline Star
                          <StarIconOutline className="w-5 h-5 hover:text-blue-500 dark:hover:text-blue-300" />
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
              {lang === "en"
                ? "Thank you for rating this course."
                : "Merci d'avoir noté ce cours."}
            </p>
          )}
          {errorMessage && (
            <p className="mt-2 text-red-500 dark:text-red-300 animate__animated animate__fadeIn">
              {lang === "en"
                ? "An error occured. Please try again later."
                : "Une erreur est survenue. Veuillez réessayer plus tard."}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default CoursesSatisfaction;
