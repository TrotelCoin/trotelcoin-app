"use client";

import "animate.css";
import type { Lang } from "@/types/lang";
import type { Lesson } from "@/types/courses/lessons";
import React, { useEffect, useState, useContext } from "react";
import lessons from "@/data/lessons/lessonsData";
import CourseFinished from "@/app/[lang]/[quizId]/components/courseFinished";
import { useAccount } from "wagmi";
import UnauthorizedContent from "@/app/[lang]/[quizId]/components/unauthorizedContent";
import Disclaimer from "@/app/[lang]/[quizId]/components/disclaimer";
import { getTierByQuizId, getAvailabilityByQuizId } from "@/utils/getByquizId";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { usePathname } from "next/navigation";
import Success from "@/app/[lang]/components/modals/success";
import CountUp from "react-countup";
import { fetcher } from "@/lib/axios/fetcher";
import CourseFinishedProvider from "@/app/[lang]/providers/courseFinishedProvider";
import useSWR from "swr";
import { ShareIcon } from "@heroicons/react/20/solid";
import CourseFinishedContext from "@/app/[lang]/contexts/courseFinishedContext";
import CourseTitle from "@/app/[lang]/[quizId]/components/courseTitle";
import SeparatorVertical from "@/app/[lang]/components/separator/seperatorVertical";

const CoursePage = ({
  params: { lang, quizId },
  children,
}: {
  params: { lang: Lang; quizId: number };
  children: React.ReactNode;
}) => {
  const [answered, setAnswered] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const pathname = usePathname();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${pathname}`;

  const { data: numberOfAnswers } = useSWR(
    quizId ? `/api/database/getCourseNumberOfAnswers?quizId=${quizId}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: 3600000,
    }
  );

  useEffect(() => {
    if (numberOfAnswers) {
      setAnswered(numberOfAnswers);
    }
  }, [numberOfAnswers]);

  const foundTier = getTierByQuizId(quizId, lessons);
  const foundAvailability = getAvailabilityByQuizId(quizId, lessons);

  const currentCourse: Lesson = lessons
    .flatMap((lesson) => lesson.courses)
    .find((course) => course.quizId.toString() === quizId.toString()) as Lesson;

  let tier = "";
  let title = "";

  switch (lang) {
    case "en":
      tier = foundTier;
      title = currentCourse?.title.en;
      break;
    case "fr":
      tier = foundTier;
      title = currentCourse?.title.fr;
      break;
    default:
      tier = foundTier;
      title = currentCourse?.title.en;
  }

  const { address } = useAccount();

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  const renderUnauthorizedContent = () => {
    return (
      <>
        <UnauthorizedContent lang={lang} />
      </>
    );
  };

  const renderCourseContent = (children: React.ReactNode) => {
    return (
      <>
        <CourseFinishedProvider>
          <div className="mx-auto max-w-2xl text-base leading-7 text-gray-900 dark:text-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold leading-7 text-blue-500 dark:text-blue-300">
                  {lang === "en" ? "Course" : "Cours"}
                </p>
                <SeparatorVertical />
                <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
                  <CountUp start={0} duration={2} end={answered} />{" "}
                  {lang === "en" ? "participants" : "participants"}
                </p>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: title,
                      text: `Wanna learn about ${title}? \n\nCheck out this TrotelCoin course and start earning cryptocurrencies! \n\n${URL}`,
                    });
                  }
                }}
                className="p-2 rounded-full bg-gray-50 dark:bg-gray-900 focus:bg-gray-50 dark:focus:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
            </div>
            <CourseTitle title={title} />

            {/* Disclaimer */}
            <div className="mt-4">
              <Disclaimer lang={lang} />
            </div>

            {/* Course */}
            <div className="flex justify-start">{children}</div>

            <CourseFinished lang={lang} quizId={quizId} />
          </div>
        </CourseFinishedProvider>

        <Success
          show={copied}
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

  return (
    <>
      {!address && tier !== "Beginner"
        ? renderUnauthorizedContent()
        : !foundAvailability ||
          (tier !== "Beginner" &&
            (((tier === "Intermediate" || tier === "Intermédiaire") &&
              !isIntermediate) ||
              (tier === "Expert" && !isExpert)))
        ? renderUnauthorizedContent()
        : renderCourseContent(children)}
    </>
  );
};

export const useCourseFinished = () => {
  const context = useContext(CourseFinishedContext);

  return context;
};

export default CoursePage;
