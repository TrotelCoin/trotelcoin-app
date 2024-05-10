"use client";

import "animate.css";
import type { Lang } from "@/types/language/lang";
import type { Lesson } from "@/types/courses/lessons";
import React, { useEffect, useState, useContext } from "react";
import lessons from "@/data/lessons/lessons";
import CourseFinished from "@/app/[lang]/components/courses/courseFinished";
import { useAccount } from "wagmi";
import UnauthorizedContent from "@/app/[lang]/components/courses/unauthorizedContent";
import Disclaimer from "@/app/[lang]/components/courses/disclaimer";
import { getTierByQuizId } from "@/utils/quizzes/getTierByquizId";
import { getAvailabilityByQuizId } from "@/utils/quizzes/getAvailabilityByQuizId";
import PremiumContext from "@/contexts/premium";
import { usePathname } from "next/navigation";
import Success from "@/app/[lang]/components/modals/success";
import CountUp from "react-countup";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import CourseFinishedProvider from "@/providers/courseFinished";
import useSWR from "swr";
import { ShareIcon } from "@heroicons/react/20/solid";
import CourseFinishedContext from "@/contexts/courseFinished";
import CourseTitle from "@/app/[lang]/components/courses/courseTitle";
import SeparatorVertical from "@/app/[lang]/components/separator/vertical";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params: { lang, quizId } }: { params: { lang: Lang; quizId: number } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const foundTier = getTierByQuizId(quizId, lessons);

  const currentCourse: Lesson = lessons
    .flatMap((lesson) => lesson.courses)
    .find((course) => course.quizId.toString() === quizId.toString()) as Lesson;

  let title = "";
  let description = "";

  switch (lang) {
    case "en":
      title = currentCourse?.title.en;
      description = currentCourse?.description.en;
      break;
    case "fr":
      title = currentCourse?.title.fr;
      description = currentCourse?.description.fr;
      break;
    default:
      title = currentCourse?.title.en;
      description = currentCourse?.description.en;
  }

  return {
    title: title,
    description: description,
    generator: "Next.js",
    manifest: "/manifest.json",
    appleWebApp: true,
    keywords:
      "trotelcoin, learn, earn, learn & earn, crypto, bitcoin, ethereum, trotelcoin app, trotelcoin.com, trotelcoin app, trotelcoin app",
    authors: [{ name: "TrotelCoin" }],
    robots: "index, follow",
    openGraph: {
      title: title,
      type: "website",
      locale: "en_US",
      url: `https://app.trotelcoin.com/${lang}/${quizId}`,
      siteName: "TrotelCoin App",
      description: description,
      images: [
        {
          url: "https://app.trotelcoin.com/assets/banner/trotelcoin-banner.png",
          width: 800,
          height: 600,
          alt: "TrotelCoin App",
        },
      ],
    },
    twitter: {
      card: "summary",
      site: "@trotelcoin",
      creator: "@trotelcoin",
      title: title,
    },
  };
}

const CoursePage = ({
  params: { lang, quizId },
  children,
}: {
  params: { lang: Lang; quizId: number };
  children: React.ReactNode;
}) => {
  const [answered, setAnswered] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = new Date().getTime();

    setStartTime(startTime);
  }, []);

  const pathname = usePathname();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${pathname}`;

  const { data: numberOfAnswers } = useSWR(
    quizId ? `/api/course/number-of-answers?quizId=${quizId}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
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
                className="p-2 rounded-full bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
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

            <CourseFinished
              lang={lang}
              quizId={quizId}
              startTime={startTime as number}
            />
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
