"use client";

import React, { useState } from "react";
import { Lessons } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const lessons: Lessons[] = [
  {
    category: "TrotelCoin",
    percentage: 0,
    courses: [
      {
        title: "Introduction to TrotelCoin",
        href: "/trotelcoin/introduction-to-trotelcoin",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: true,
      },
      {
        title: "Earn Intermediate and Expert NFTs",
        href: "/trotelcoin/earn-intermediate-and-expert-nfts",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: true,
      },
    ],
  },
  {
    category: "Wallet",
    percentage: 0,
    courses: [
      {
        title: "Create your first wallet",
        href: "/wallet/create-your-first-wallet",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
      },
      {
        title: "Secure your wallet",
        href: "/wallet/secure-your-wallet",
        image: "",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
      },
      {
        title: "Authenticate with your wallet",
        href: "/wallet/authenticate-with-your-wallet",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
      },
      {
        title: "Make your first transaction",
        href: "/wallet/make-your-first-transaction",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
      },
    ],
  },
  {
    category: "Blockchain",
    percentage: 0,
    courses: [
      {
        title: "What is a blockchain?",
        href: "/blockchain/what-is-a-blockchain",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
      },
      {
        title: "Consensus mechanisms",
        href: "/blockchain/consensus-mechanisms",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
      },
    ],
  },
  {
    category: "Bitcoin",
    percentage: 0,
    courses: [
      {
        title: "What is Bitcoin?",
        href: "/bitcoin/what-is-bitcoin",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
      },
      {
        title: "The history of Bitcoin",
        href: "/bitcoin/the-history-of-bitcoin",
        image: "",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
      },
    ],
  },
  {
    category: "Ethereum",
    percentage: 0,
    courses: [
      {
        title: "What is Ethereum?",
        href: "/ethereum/what-is-ethereum",
        image: "",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
      },
      {
        title: "Understand the layers 2",
        href: "/ethereum/understand-the-layers-2",
        image: "",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
      },
    ],
  },
  {
    category: "Governance",
    percentage: 0,
    courses: [
      {
        title: "What are DAOs?",
        href: "/governance/what-are-daos",
        image: "",
        status: "Not started",
        tier: "Expert",
        sponsored: false,
      },
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
              <div className="flex gap-x-2 items-center">
                <h2 className="font-semibold bg-blue-600 dark:bg-blue-200 px-6 py-2 rounded-full text-sm text-gray-100 dark:text-gray-900">
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
                    className="w-full md:w-1/2 lg:w-1/6 h-full"
                  >
                    <div className="rounded-lg hover:shadow active:shadow-none active:border-blue-600 bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 backdrop-blur-xl">
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
                        <div className="flex flex-wrap mt-4 gap-2 items-center">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              course.status === "Not started"
                                ? "bg-gray-50 dark:bg-gray-400/10 text-gray-700 dark:text-gray-400 ring-gray-500/20 dark:ring-gray-400/40"
                                : course.status === "Finished"
                                ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-green-600/20 dark:ring-green-500/40"
                                : course.status === "Ongoing"
                                ? "bg-blue-50 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400 ring-blue-600/20 dark:ring-blue-400/40"
                                : ""
                            }`}
                          >
                            {course.status}
                          </span>
                          {course.tier == "Intermediate" && (
                            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-pink-50 dark:bg-pink-400/10 text-pink-800 dark:text-pink-400 ring-pink-600/20 dark:ring-pink-400/40">
                              {course.tier}
                            </span>
                          )}
                          {course.tier == "Expert" && (
                            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-red-50 dark:bg-red-400/10 text-red-800 dark:text-red-400 ring-red-600/20 dark:ring-red-400/40">
                              {course.tier}
                            </span>
                          )}
                          {course.sponsored && (
                            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-yellow-50 dark:bg-yellow-400/10 text-yellow-800 dark:text-yellow-400 ring-yellow-600/20 dark:ring-yellow-400/40">
                              Sponsored
                            </span>
                          )}
                        </div>
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
