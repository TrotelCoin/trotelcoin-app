import { Lang } from "@/types/types";
import React, { useEffect } from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";

const CoursesCount = ({ lang }: { lang: Lang }) => {
  const { data: coursesCount } = useSWR("/api/courses/coursesCount", fetcher);

  return (
    <>
      <div
        className={`bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <span className="font-semibold text-2xl md:text-4xl">
          {coursesCount ? (
            <>
              {coursesCount ?? 0} <span className="hidden md:inline">📖</span>
            </>
          ) : (
            <span className="animate__animated animate__flash animate__slower animate__infinite">
              0 <span className="hidden md:inline">📖</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Courses" : "Cours"}</span>
      </div>
    </>
  );
};

export default CoursesCount;
