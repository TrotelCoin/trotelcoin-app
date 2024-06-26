import type { Lang } from "@/types/language/lang";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import useSWR from "swr";
import axios from "axios";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";

const CoursesSatisfaction = ({
  quizId,
  lang
}: {
  quizId: number;
  lang: Lang;
}) => {
  const [satisfactionMessage, setSatisfactionMessage] =
    useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [rated, setRated] = useState<boolean>(false);

  const { address } = useAccount();

  const postSatisfaction = async (rating: number) => {
    if (rating) {
      try {
        await axios
          .post(`/api/user/course/satisfaction`, {
            rating: rating,
            quizId: quizId,
            wallet: address
          })
          .then(() => {
            setSatisfactionMessage(true);
            setRated(true);
          });
      } catch (error) {
        console.error(error);
        setErrorMessage(true);
      }
    }
  };

  const { data: coursesSatisfactionAnswered, error } = useSWR(
    address && quizId
      ? `/api/user/course/satisfaction-status?wallet=${address}&quizId=${quizId}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  useEffect(() => {
    if (error) {
      setErrorMessage(true);
    }
  }, [error]);

  return (
    <>
      {(address as Address) &&
        !coursesSatisfactionAnswered?.answered &&
        !rated && (
          <div className="mx-auto flex flex-col border-t border-gray-900/10 py-10 dark:border-gray-100/10">
            <div className="flex items-center">
              {!coursesSatisfactionAnswered?.answered && (
                <>
                  <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                    {lang === "en" ? "Rate this course:" : "Notez ce cours:"}
                  </h2>
                  <div className="flex items-center">
                    {[...Array(5)].map((index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index} className="ml-1 cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            value={ratingValue as number}
                            onClick={() => {
                              setRating(ratingValue);
                              postSatisfaction(ratingValue);
                            }}
                            className="hidden"
                          />
                          {ratingValue <= (rating as number) ? (
                            // Filled Star
                            <StarIconSolid className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                          ) : (
                            // Outline Star
                            <StarIconOutline className="h-5 w-5 hover:text-blue-500 dark:hover:text-blue-300" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      <SuccessNotification
        lang={lang}
        display={satisfactionMessage}
        onClose={() => setSatisfactionMessage(false)}
        title={lang === "en" ? "Thank you!" : "Merci !"}
        message={
          lang === "en"
            ? "Thank you for rating this course."
            : "Merci d'avoir noté ce cours."
        }
      />
      <FailNotification
        lang={lang}
        display={errorMessage}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "An error occured. Please try again later."
            : "Une erreur est survenue. Veuillez essayer plus tard."
        }
      />
    </>
  );
};

export default CoursesSatisfaction;
