import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { Lesson, LessonCategory } from "@/types/courses/lessons";
import renderCourses from "@/app/[lang]/home/components/renderCourses";
import type { Lang } from "@/types/language/lang";
import React from "react";
import { Skeleton } from "@radix-ui/themes";
import SkeletonCourseCard from "@/app/[lang]/home/components/skeletonCourseCard";
import Link from "next/link";

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
  viewAll,
  categoryUrl
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
  viewAll?: boolean;
  categoryUrl?: string;
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton loading={isLoading}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          </Skeleton>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <Skeleton loading={isLoading}>
              <button
                className="flex items-center justify-center rounded-full border border-gray-900/10 bg-white p-1 text-center text-xs text-gray-900 hover:bg-gray-100 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                onClick={() => scroll(scrollRef, "left")}
              >
                <ChevronLeftIcon className="h-4 w-4 text-black dark:text-white" />
              </button>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <button
                className="flex items-center justify-center rounded-full border border-gray-900/10 bg-white p-1 text-center text-xs text-gray-900 hover:bg-gray-100 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                onClick={() => scroll(scrollRef, "right")}
              >
                <ChevronRightIcon className="h-4 w-4 text-black dark:text-white" />
              </button>
            </Skeleton>
          </div>

          {viewAll && (
            <Link href={`/${lang}/category/${categoryUrl}`}>
              <Skeleton loading={isLoading}>
                <button className="flex items-center justify-center rounded-full border border-gray-900/10 bg-white px-2 py-1 text-center text-xs text-gray-900 hover:bg-gray-100 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
                  {lang === "en" ? "View all" : "Voir tout"}
                </button>
              </Skeleton>
            </Link>
          )}
        </div>
      </div>
      <div
        ref={scrollRef as React.RefObject<HTMLDivElement>}
        className="hide-scrollbar mt-4 flex items-center gap-4 overflow-x-auto scroll-smooth"
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
          : Array.from({ length: 10 }, (_, index) => (
              <SkeletonCourseCard key={index} isLoading={isLoading} />
            ))}
      </div>
    </div>
  );
};

export default CourseSection;
