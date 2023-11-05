import React from "react";
import { Lessons } from "@/types/types";

const lessons: Lessons[] = [
  {
    category: "Wallet",
    percentage: 0,
    courses: [
      {
        title: "Setting up your first wallet",
        href: "/wallet/setting-up-your-first-wallet",
        status: "Not started",
      },
    ],
  },
];

const Courses = () => {
  return (
    <>
      <div className="flex justify-center mx-4 lg:mx-10 my-20 overflow-hidden">
        {lessons.map((lesson) => (
          <div className="flex flex-col" key={lesson.category}>
            <div className="flex gap-x-4">
              <h2 className="text-stone-900 dark:text-stone-100">
                {lesson.category}
              </h2>
              <span className="text-stone-900 dark:text-stone-100">
                {lesson.percentage}%
              </span>
            </div>
            {lesson.courses.map((course) => (
              <div
                key={course.title}
                className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-900/10 dark:border-stone-100/10 backdrop-blur-xl"
              >
                <h3 className="text-stone-900 dark:text-stone-100">
                  {course.title}
                </h3>
                <span className="text-stone-700 dark:text-stone-300">
                  {course.status}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
