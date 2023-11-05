"use client";

import React, { useState } from "react";
import { Lessons } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const lessons: Lessons[] = [
  {
    category: "Wallet",
    percentage: 0,
    courses: [
      {
        title: "Setting up your first wallet",
        href: "/wallet/setting-up-your-first-wallet",
        image: "",
        status: "Not started",
      },
      {
        title: "Secure your wallet",
        href: "/",
        image: "",
        status: "Not started",
      },
      {
        title: "Authenticate with your wallet",
        href: "/",
        image: "",
        status: "Not started",
      },
      {
        title: "Make your first transaction",
        href: "/",
        image: "",
        status: "Not started",
      },
    ],
  },
  {
    category: "Blockchain",
    percentage: 0,
    courses: [
      {
        title: "What is a blockchain ?",
        href: "",
        image: "",
        status: "Not started",
      },
      {
        title: "Consensus mechanisms",
        href: "",
        image: "",
        status: "Not started",
      },
    ],
  },
  {
    category: "Bitcoin",
    percentage: 0,
    courses: [
      {
        title: "What is Bitcoin ?",
        href: "",
        image: "",
        status: "Not started",
      },
      {
        title: "The history of Bitcoin",
        href: "",
        image: "",
        status: "Not started",
      },
    ],
  },
  {
    category: "Ethereum",
    percentage: 0,
    courses: [
      {
        title: "The world's computer",
        href: "",
        image: "",
        status: "Not started",
      },
    ],
  },
  {
    category: "Governance",
    percentage: 0,
    courses: [
      { title: "What are DAOs ?", href: "", image: "", status: "Not started" },
    ],
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredLessons = lessons.filter((lesson) => {
    return lesson.courses.some((course) =>
      course.title.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <div className="mx-10 lg:mx-32 mt-10 mb-20 overflow-hidden">
        <form className="my-10">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search a course
          </label>
          <div className="relative mx-auto w-3/4">
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
              placeholder="Search a course"
              onChange={handleSearch}
              style={{ appearance: "none" }}
            />
          </div>
        </form>
        <div className="flex flex-col">
          {filteredLessons.map((lesson) => (
            <div className="py-10" key={lesson.category}>
              <div className="flex gap-x-2 items-center">
                <h2 className="font-semibold bg-blue-600 dark:bg-blue-200 hover:bg-blue-600/80 dark:hover:bg-blue-200/80 dark:hover:bg-blue-50 px-6 py-2 rounded-full text-sm text-gray-100 dark:text-gray-900">
                  {lesson.category}
                </h2>
                <span className="text-gray-900 dark:text-gray-100">
                  &#8226;
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {lesson.percentage}%
                </span>
              </div>
              <div className="mt-4 flex flex-row flex-wrap gap-4">
                {lesson.courses.map((course) => (
                  <Link
                    href={course.href}
                    key={course.title}
                    className="w-full md:w-64 h-full"
                  >
                    <div className="rounded-lg hover:shadow active:shadow-none active:border-blue-600 bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 min-h-90 backdrop-blur-xl">
                      {/*<Image
                        className="bg-cover rounded-t-md"
                        alt={course.title}
                        width={128}
                        height={180}
                        src={course.image}
                      />*/}
                      <div className="px-4 pb-4">
                        <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                          {course.title}
                        </h3>
                        <span
                          className={`inline-flex mt-4 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            course.status === "Not started"
                              ? "bg-gray-50 dark:bg-gray-400/10 text-gray-700 dark:text-gray-400 ring-gray-500/20 dark:ring-gray-400/40"
                              : course.status === "Finished"
                              ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-green-600/20 dark:ring-green-500/40"
                              : course.status === "Ongoing"
                              ? "bg-yellow-50 dark:bg-yellow-400/10 text-yellow-800 dark:text-yellow-400 ring-yellow-600/20 dark:ring-yellow-400/40"
                              : ""
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
