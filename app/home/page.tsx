"use client";

import React, { useState } from "react";
import Link from "next/link";
import lessons from "@/data/lessonsData";
import { useAccount, useContractRead } from "wagmi";
import { polygon } from "wagmi/chains";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/addresses";
import { Lessons, Lesson } from "@/types/types";

function filterByCategory(lesson: Lessons, searchTerm: any) {
  return lesson.category.toLowerCase().includes(searchTerm);
}

function filterByTitleOrDescription(course: Lesson, searchTerm: string) {
  return (
    course.title.toLowerCase().includes(searchTerm) ||
    course.description.toLowerCase().includes(searchTerm)
  );
}

function renderCourses(
  course: Lesson,
  intermediateBalance: number,
  expertBalance: number,
  isConnected: boolean
) {
  const isIntermediate =
    course.tier === "Intermediate" && intermediateBalance > 0;
  const isExpert = course.tier === "Expert" && expertBalance > 0 && isConnected;

  const courseLink =
    isIntermediate || isExpert || course.tier === "Beginner"
      ? course.href
      : "/not-premium";

  const borderClass =
    (course.tier === "Expert" && expertBalance > 0) ||
    (course.tier === "Intermediate" && intermediateBalance > 0)
      ? "rainbow-border"
      : "active:border-blue-600 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50";

  {
    /*const statusClass =
    course.status === "Not started"
      ? "hidden bg-gray-600 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
      : course.status === "Finished"
      ? "bg-green-600 dark:bg-green-200 text-gray-100 dark:text-gray-900"
      : course.status === "Ongoing"
      ? "hidden bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900"
: "";*/
  }

  return (
    <Link href={courseLink} key={course.title}>
      <div
        className={`rounded-lg hover:shadow mr-4 my-2 active:shadow-none bg-gray-50 dark:bg-gray-900 ${borderClass} backdrop-blur-xl`}
      >
        <div className="px-4 pb-4">
          <h3 className={`mt-4 font-semibold text-gray-900 dark:text-gray-100`}>
            {course.title}
          </h3>
          <p className={`text-gray-700 dark:text-gray-300 text-xs`}>
            {course.description}
          </p>
          <div className="flex flex-wrap mt-4 gap-2 items-center">
            {course.tier === "Beginner" && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-gray-600 dark:bg-gray-200 text-gray-100 dark:text-gray-900">
                {course.tier}
              </span>
            )}
            {course.tier === "Intermediate" && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900">
                {course.tier}
              </span>
            )}
            {course.tier === "Expert" && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-red-600 dark:bg-red-200 text-gray-100 dark:text-gray-900">
                {course.tier}
              </span>
            )}
            {!course.available && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-gray-600 dark:bg-gray-200 text-gray-100 dark:text-gray-900">
                Not available
              </span>
            )}
            {/*<span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${statusClass}`}
            >
              {course.status}
            </span>*/}
            {course.sponsored && (
              <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium bg-yellow-600 dark:bg-yellow-200 text-gray-100 dark:text-gray-900">
                Sponsored
              </span>
            )}
            {course.new && (
              <span className="inline-flex items-center ring-1 ring-inset ring-gray-900/10 dark:ring-transparent rounded-lg px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-200 dark:from-yellow-200 to-pink-200 dark:to-pink-200 text-gray-900 dark:text-gray-900">
                New course
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterLessons = (lesson: Lessons) => {
    const categoryMatch = filterByCategory(lesson, searchTerm);
    const titleOrDescMatch = lesson.courses.some((course) =>
      filterByTitleOrDescription(course, searchTerm)
    );
    return categoryMatch || titleOrDescMatch;
  };

  const filteredLessons = lessons.filter(filterLessons);

  const { address, isConnected } = useAccount();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    args: [address],
    account: address,
    functionName: "balanceOf",
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    args: [address],
    account: address,
    functionName: "balanceOf",
    watch: true,
  });

  const intermediateBalance = parseFloat(intermediate as string);
  const expertBalance = parseFloat(expert as string);

  return (
    <>
      <>
        <form className="my-20">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            What do you wanna learn?
          </label>
          <div className="relative mx-auto w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-900 dark:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 focus:shadow focus:border-gray-900/50 dark:focus:border-gray-100/50 text-sm text-gray-900 border border-gray-900/10 rounded-full bg-gray-50 dark:bg-gray-900 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              placeholder="What do you wanna learn?"
              onChange={handleSearch}
              style={{ appearance: "none" }}
            />
          </div>
        </form>
        <div className="flex flex-col">
          {filteredLessons.map((lesson) => (
            <div className="py-10" key={lesson.category}>
              <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                {lesson.category}
              </h2>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {lesson.courses
                  .slice()
                  .sort((a, b) => {
                    const tierOrder = {
                      Beginner: 0,
                      Intermediate: 1,
                      Expert: 2,
                    };
                    return tierOrder[a.tier] - tierOrder[b.tier];
                  })
                  .map((course) =>
                    renderCourses(
                      course,
                      intermediateBalance,
                      expertBalance,
                      isConnected
                    )
                  )}
              </div>
            </div>
          ))}
        </div>
      </>
    </>
  );
}
