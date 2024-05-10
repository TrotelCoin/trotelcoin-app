import "animate.css";
import type { Lang } from "@/types/language/lang";
import type { Lesson } from "@/types/courses/lessons";
import React from "react";
import lessons from "@/data/lessons/lessons";
import type { Metadata, ResolvingMetadata } from "next";
import Course from "@/app/[lang]/components/courses/course";

export async function generateMetadata(
  { params: { lang, quizId } }: { params: { lang: Lang; quizId: number } },
  parent: ResolvingMetadata
): Promise<Metadata> {
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
  <>
    <Course quizId={quizId} lang={lang}>
      {children}
    </Course>
  </>;
};

export default CoursePage;
