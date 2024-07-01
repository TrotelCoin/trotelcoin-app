"use client";

import React, { useEffect, useState } from "react";
import { Lang } from "@/types/language/lang";
import CourseFinished from "@/app/[lang]/components/courses/courseFinished";
import CourseTitle from "@/app/[lang]/components/courses/courseTitle";
import Disclaimer from "@/app/[lang]/components/courses/disclaimer";
import { ShareIcon } from "@heroicons/react/20/solid";
import CountUp from "react-countup";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import SeparatorVertical from "@/app/[lang]/components/separator/vertical";
import useSWR from "swr";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";

const CourseContent = ({
  lang,
  quizId,
  title,
  URL,
  children,
  description
}: {
  lang: Lang;
  quizId: number;
  title: string;
  URL: string;
  children: React.ReactNode;
  description: string;
}) => {
  const [answered, setAnswered] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = new Date().getTime();

    setStartTime(startTime);
  }, []);

  const { data: numberOfAnswers } = useSWR(
    quizId ? `/api/course/number-of-answers?quizId=${quizId}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  useEffect(() => {
    if (numberOfAnswers) {
      setAnswered(numberOfAnswers);
    }
  }, [numberOfAnswers]);

  return (
    <>
      <div className="mx-auto max-w-2xl text-base leading-7 text-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold leading-7 text-blue-500 dark:text-blue-300">
              {lang === "en" ? "Course" : "Cours"}
            </p>
            <SeparatorVertical />
            <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
              <CountUp start={0} duration={2} end={answered as number} />{" "}
              {lang === "en" ? "participants" : "participants"}
            </p>
          </div>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: title,
                  text: `Wanna learn about ${title}? \n\nCheck out this TrotelCoin course and start earning cryptocurrencies! \n\n${URL}`
                });
              } else {
                const twitterURL = `https://twitter.com/intent/tweet?text=Wanna learn about ${title}? \n\n\nCheck out this TrotelCoin course and start earning cryptocurrencies! \n\n\n${URL}`;
                window.open(twitterURL, "_blank");
              }
            }}
            className="rounded-full bg-white p-2 text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
        <CourseTitle title={title} />

        <div className="mt-4 text-gray-900 dark:text-gray-100">
          {description}
        </div>

        {/* Disclaimer */}
        <div className="mt-4">
          <Disclaimer lang={lang} />
        </div>

        {/* Course */}
        <div className="flex justify-start">{children}</div>

        <CourseFinished
          lang={lang}
          quizId={quizId}
          startTime={startTime as number}
        />
      </div>

      <SuccessNotification
        display={copied}
        onClose={() => setCopied(false)}
        lang={lang}
        title={lang === "en" ? "Share" : "Partagez"}
        message={
          lang === "en"
            ? "The address has been copied, you can now share the URL."
            : "L'adresse a été copiée, vous pouvez maintenant partager l'URL."
        }
      />
    </>
  );
};

export default CourseContent;
