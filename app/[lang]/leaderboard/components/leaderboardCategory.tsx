import { Lang } from "@/types/language/lang";
import { LeaderboardCategories } from "@/types/leaderboard/leaderboard";
import React, { SetStateAction } from "react";

const LeaderboardCategory = ({
  lang,
  category,
  setCategory
}: {
  lang: Lang;
  category: LeaderboardCategories;
  setCategory: React.Dispatch<SetStateAction<LeaderboardCategories>>;
}) => {
  return (
    <>
      <div className="mt-2 flex md:flex-wrap whitespace-nowrap items-center gap-2 hide-scrollbar overflow-x-auto md:overflow-x-visible">
        <button
          onClick={() => {
            setCategory("rewards");
          }}
          className={`${
            category === "rewards"
              ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Rewards" : "Récompenses"}
        </button>
        <button
          onClick={() => {
            setCategory("learningTime");
          }}
          className={`${
            category === "learningTime"
              ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Learning time" : "Temps d'apprentissage"}
        </button>
        <button
          onClick={() => {
            setCategory("marks");
          }}
          className={`${
            category === "marks"
              ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Marks" : "Notes"}
        </button>
        <button
          onClick={() => {
            setCategory("numberOfQuizzesAnswered");
          }}
          className={`${
            category === "numberOfQuizzesAnswered"
              ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Quizzes answered" : "Quiz répondus"}
        </button>
        <button
          onClick={() => {
            setCategory("streaks");
          }}
          className={`${
            category === "streaks"
              ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
        >
          {lang === "en" ? "Streaks" : "Séries"}
        </button>
      </div>
    </>
  );
};

export default LeaderboardCategory;
