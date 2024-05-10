import { Lessons } from "@/types/courses/lessons";
import type { Lang } from "@/types/language/lang";
import React from "react";

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
            className="appearance-none block w-full p-4 pl-14 focus:shadow-xl text-sm text-gray-900 border border-gray-900/10 rounded-full bg-gray-50 dark:bg-gray-800 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-transparent focus:border-gray-900/10 dark:focus:border-gray-100/10 transition-all duration-200 ease-in-out"
            placeholder={
              lang === "en"
                ? "What do you want to learn?"
                : "Que voulez-vous apprendre ?"
            }
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
        </div>
      </form>
    </>
  );
};

export default Form;
