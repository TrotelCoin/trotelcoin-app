import type { Lang } from "@/types/language/lang";
import { Lesson } from "@/types/courses/lessons";
import Tilt from "react-parallax-tilt";
import Link from "next/link";

const renderCourses = (
  course: Lesson,
  isIntermediate: boolean,
  isExpert: boolean,
  lang: Lang,
  quizId: number,
  status: string[],
  index: number,
  category: string
) => {
  let tier = "";
  let title = "";
  let description = "";

  switch (lang) {
    case "en":
      tier = course.tier.en;
      title = course.title.en;
      description = course.description.en;
      break;
    case "fr":
      tier = course.tier.fr;
      title = course.title.fr;
      description = course.description.fr;
      break;
    default:
      tier = course.tier.en;
      title = course.title.en;
      description = course.description.en;
      break;
  }

  const courseLink =
    isIntermediate || isExpert || tier === "Beginner" || tier === "Débutant"
      ? `/${lang}/${quizId}${course.href}`
      : `/${lang}/not-premium`;

  const borderClass =
    (tier === "Expert" && isExpert) ||
    ((tier === "Intermediate" || tier === "Intermédiaire") && isIntermediate)
      ? "rainbow-border"
      : "active:border-blue-500 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50";

  const statusClass =
    status[quizId - 1] === "Not started"
      ? "bg-gray-500 text-gray-100 hidden"
      : status[quizId - 1] === "Finished"
      ? "bg-green-400 text-gray-100"
      : "";

  return (
    <Link href={`${courseLink}`} key={index} className="h-full">
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.15}
        perspective={800}
        className="h-full"
      >
        <div
          className={`rounded-xl h-full flex flex-col justify-between items-start p-4 hover:shadow active:border-blue-500 dark:active:border-blue-300 active:shadow-none bg-white dark:bg-gray-800 ${borderClass} backdrop-blur-xl`}
        >
          <div>
            <div className="flex items-center">
              <div className={`font-semibold text-gray-900 dark:text-gray-100`}>
                {title}
              </div>
            </div>
            <div>
              <div className={`text-gray-700 dark:text-gray-300 text-xs`}>
                {description}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-4 gap-2 items-center">
            {(tier === "Beginner" || tier === "Débutant") && (
              <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-gray-500 text-gray-100">
                {tier} 🐣
              </div>
            )}
            {(tier === "Intermediate" || tier === "Intermédiaire") && (
              <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-blue-400 text-gray-100">
                {tier} 🙈
              </div>
            )}
            {tier === "Expert" && (
              <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-red-400 text-gray-100">
                {tier} 🦊
              </div>
            )}
            {!course.available && (
              <div className="inline-flex items-center rounded-xl text-xs font-medium bg-transparent text-gray-900 dark:text-gray-100">
                {lang === "en" ? "Not available" : "Non disponible"}
              </div>
            )}
            {course.available && (
              <div
                className={`inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ${statusClass}`}
              >
                {status[quizId - 1] === "Not started" && lang === "en" && (
                  <>Not started 🤔</>
                )}
                {status[quizId - 1] === "Not started" && lang === "fr" && (
                  <>Pas commencé 🤔</>
                )}
                {status[quizId - 1] === "Finished" && lang === "en" && (
                  <>Finished 💪</>
                )}
                {status[quizId - 1] === "Finished" && lang === "fr" && (
                  <>Terminé 💪</>
                )}
              </div>
            )}
            {course.sponsored && (
              <div className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium bg-blue-400 text-gray-100">
                {lang === "en" ? "Sponsored 📚" : "Sponsorisé 📚"}
              </div>
            )}
            {course.new && (
              <div className="inline-flex items-center ring-1 ring-inset ring-gray-900/20 dark:ring-transparent rounded-xl px-2 py-1 text-xs font-medium gradient-animation text-gray-900 dark:text-gray-900">
                {lang === "en" ? "New 👀" : "Nouveau 👀"}
              </div>
            )}
          </div>
        </div>
      </Tilt>
    </Link>
  );
};

export default renderCourses;
