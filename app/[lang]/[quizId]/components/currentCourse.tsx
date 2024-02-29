import { Lang, Course } from "@/types/types";
import React from "react";
const CurrentCourse = ({
  lang,
  currentCourse,
}: {
  lang: Lang;
  currentCourse: Course;
}) => {
  return (
    <>
      <div className="bg-gray-100 my-10 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-xl dark:bg-gray-800">
        <ul
          role="list"
          className="space-y-8 text-gray-700 dark:text-gray-300"
        >
          <div className="grid grid-cols-1 divide-y divide-gray-900/10 dark:divide-gray-100/10">
            <div className="py-4 px-10">
              <li className="flex gap-x-3">
                <span className="text-gray-900 dark:text-gray-100">
                  {lang == "en" && <>{currentCourse?.one.en}</>}
                  {lang == "fr" && <>{currentCourse?.one.fr}</>}
                </span>
              </li>
            </div>
            <div className="py-4 px-10">
              <li className="flex gap-x-3">
                <span className="text-gray-900 dark:text-gray-100">
                  {lang == "en" && <>{currentCourse?.two.en}</>}
                  {lang == "fr" && <>{currentCourse?.two.fr}</>}
                </span>
              </li>
            </div>
            <div className="py-4 px-10">
              <li className="flex gap-x-3">
                <span className="text-gray-900 dark:text-gray-100">
                  {lang == "en" && <>{currentCourse?.three.en}</>}
                  {lang == "fr" && <>{currentCourse?.three.fr}</>}
                </span>
              </li>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default CurrentCourse;