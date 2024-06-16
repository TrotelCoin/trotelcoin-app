import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { Lesson, LessonCategory } from "@/types/courses/lessons";
import renderCourses from "@/app/[lang]/home/components/renderCourses";
import type { Lang } from "@/types/language/lang";
import React from "react";
import { Skeleton } from "@radix-ui/themes";
import SkeletonCourseCard from "@/app/[lang]/home/components/skeletonCourseCard";

const CourseSection = ({
  title,
  courses,
  lang,
  isIntermediate,
  isExpert,
  status,
  searchTerm,
  scrollRef,
  scroll,
  isLoading,
}: {
  title: string;
  courses: Lesson[] | null;
  lang: Lang;
  isIntermediate: boolean;
  isExpert: boolean;
  status: string[];
  searchTerm: string;
  scrollRef: React.RefObject<HTMLDivElement> | HTMLDivElement | null;
  scroll: (
    ref: React.RefObject<HTMLDivElement> | HTMLDivElement | null,
    direction: "left" | "right"
  ) => void;
  isLoading: boolean;
}) => {
  return (
    <div className="my-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
            <Skeleton loading={isLoading}>{title}</Skeleton>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
            onClick={() => scroll(scrollRef, "left")}
          >
            <ChevronLeftIcon className="h-4 w-4 text-black dark:text-white" />
          </button>
          <button
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-900/10 dark:border-gray-100/10 text-xs text-gray-900 dark:text-gray-100 p-1 text-center flex justify-center items-center rounded-full"
            onClick={() => scroll(scrollRef, "right")}
          >
            <ChevronRightIcon className="h-4 w-4 text-black dark:text-white" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef as React.RefObject<HTMLDivElement>}
        className="mt-4 overflow-x-auto flex items-center gap-4 scroll-smooth hide-scrollbar"
      >
        {courses && !isLoading
          ? courses
              .filter((course) => {
                const lowerCaseTitle = course.title[lang].toLowerCase();
                return lowerCaseTitle.includes(searchTerm) && course.available;
              })
              .slice(0, 10)
              .map((course, index) =>
                renderCourses(
                  course,
                  isIntermediate,
                  isExpert,
                  lang,
                  course.quizId,
                  status,
                  index,
                  course.category as LessonCategory
                )
              )
          : Array.from({ length: 3 }, (_, index) => (
              <SkeletonCourseCard key={index} isLoading={isLoading} />
            ))}
      </div>
    </div>
  );
};

export default CourseSection;
