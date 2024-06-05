import { Lessons } from "@/types/courses/lessons";
import { Suggestion } from "@/types/courses/suggestion";
import type { Lang } from "@/types/language/lang";
import Link from "next/link";
import React, { useEffect } from "react";

const Form = ({
  lang,
  setSearchTerm,
  searchTerm,
  filteredLessons,
}: {
  lang: Lang;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  filteredLessons: Lessons[];
}) => {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [hovering, setHovering] = React.useState<boolean>(false);

  const handleSuggestions = (): Suggestion[] => {
    let suggestions: Suggestion[] = [];

    filteredLessons.forEach((lesson) => {
      const lessonSuggestions = lesson.courses.map((course) => {
        switch (lang) {
          case "en":
            return {
              title: course.title.en,
              href: course.href,
              quizId: course.quizId,
            };
          case "fr":
            return {
              title: course.title.fr,
              href: course.href,
              quizId: course.quizId,
            };
          default:
            return {
              title: course.title.en,
              href: course.href,
              quizId: course.quizId,
            };
        }
      });

      suggestions = [...suggestions, ...lessonSuggestions];
    });

    return suggestions;
  };

  useEffect(() => {
    const suggestions = handleSuggestions();

    setSuggestions(suggestions.flat());
  }, [filteredLessons]);

  return (
    <>
      <form className="mb-12 lg:mb-18">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          {lang === "en"
            ? "What do you want to learn?"
            : "Que voulez-vous apprendre ?"}
        </label>
        <div className="relative mx-auto w-full">
          <div className="absolute inset-y-0 left-0 flex items-center px-5 pointer-events-none">
            <>🔍</>
          </div>
          <input
            type="search"
            id="default-search"
            className="appearance-none block w-full p-4 pl-14 focus:shadow-xl text-sm text-gray-900 border border-gray-900/10 rounded-full bg-white dark:bg-gray-800 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-transparent focus:border-gray-900/10 dark:focus:border-gray-100/10 transition-all duration-200 ease-in-out"
            placeholder={
              lang === "en"
                ? "What do you want to learn?"
                : "Que voulez-vous apprendre ?"
            }
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />

          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {(isActive || hovering) && (
              <div className="absolute flex flex-col mt-4 top-O divide-y divide-gray-900/10 dark:divide-gray-100/10 left-O w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl z-50 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl">
                {suggestions.length > 0 ? (
                  <>
                    <span className="font-semibold text-xl text-gray-900 dark:text-gray-100 p-4">
                      {lang === "en" ? "Suggestions" : "Suggestions"}
                    </span>

                    <div className="flex items-center flex-wrap gap-2 p-4">
                      {suggestions.slice(0, 10).map((suggestion, index) => (
                        <Link
                          key={index}
                          href={`/${suggestion.quizId}/${suggestion.href}`}
                          className="z-50 bg-blue-500 text-sm md:text-base hover:bg-gray-900 dark:hover:bg-gray-100 rounded-xl text-gray-100 dark:hover:text-gray-900 px-3 py-2"
                        >
                          {suggestion.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <span className="font-semibold text-xl flex items-center justify-center text-center text-gray-900 dark:text-gray-100 p-32">
                    {lang === "en"
                      ? "No suggestions 🤷‍♂️"
                      : "Aucune suggestion 🤷‍♂️"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
