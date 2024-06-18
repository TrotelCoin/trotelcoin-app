import { Lessons } from "@/types/courses/lessons";
import { Suggestion } from "@/types/courses/suggestion";
import type { Lang } from "@/types/language/lang";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Form = ({
  lang,
  setSearchTerm,
  searchTerm,
  filteredLessons
}: {
  lang: Lang;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  filteredLessons: Lessons[];
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);

  const generateSuggestions = (lessons: Lessons[], language: Lang) => {
    let newSuggestions: Suggestion[] = [];

    lessons.forEach((lesson) => {
      const lessonSuggestions = lesson.courses.map((course) => {
        const title = language === "fr" ? course.title.fr : course.title.en;
        return {
          title: title,
          href: course.href,
          quizId: course.quizId
        };
      });

      newSuggestions = [...newSuggestions, ...lessonSuggestions];
    });

    setSuggestions(newSuggestions);
  };

  useEffect(() => {
    generateSuggestions(filteredLessons, lang);
  }, [filteredLessons, lang]);

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);
  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  return (
    <>
      <form className="lg:mb-18 mb-12">
        <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {lang === "en"
            ? "What do you want to learn?"
            : "Que voulez-vous apprendre ?"}
        </label>
        <div className="relative mx-auto w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-5">
            <>🔍</>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full appearance-none rounded-full border border-gray-900/10 bg-white p-4 pl-14 text-sm text-gray-900 transition-all duration-200 ease-in-out focus:border-gray-900/10 focus:shadow-xl focus:outline-none focus:ring-transparent dark:border-gray-100/10 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-100/10"
            placeholder={
              lang === "en"
                ? "What do you want to learn?"
                : "Que voulez-vous apprendre ?"
            }
            onFocus={() => handleFocus()}
            onBlur={() => handleBlur()}
            onChange={(e) => handleChange(e)}
            value={searchTerm ?? ""}
            style={{
              WebkitAppearance: "none",
              appearance: "none"
            }}
          />

          <div
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
          >
            {(isActive || hovering) && (
              <div className="top-O left-O absolute z-50 mt-4 flex w-full flex-col divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white shadow-xl backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800">
                {suggestions.length > 0 ? (
                  <>
                    <span className="p-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {lang === "en" ? "Suggestions" : "Suggestions"}
                    </span>

                    <div className="flex flex-wrap items-center gap-2 p-4">
                      {suggestions.slice(0, 10).map((suggestion, index) => (
                        <Link
                          key={index}
                          href={`/${suggestion.quizId}/${suggestion.href}`}
                          className="z-50 rounded-xl bg-blue-500 px-3 py-2 text-sm text-gray-100 hover:bg-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 md:text-base"
                        >
                          {suggestion.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <span className="flex items-center justify-center p-32 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
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
