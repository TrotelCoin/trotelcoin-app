"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lessons } from "@/types/types";

const lessons: Lessons[] = [
  {
    category: "TrotelCoin",
    courses: [
      {
        title: "Introduction to TrotelCoin",
        href: "/trotelcoin/introduction-to-trotelcoin",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: true,
        new: true,
      },
      {
        title: "Earn Intermediate and Expert NFTs",
        href: "/trotelcoin/earn-intermediate-and-expert-nfts",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: true,
        new: true,
      },
    ],
  },
  {
    category: "Wallet",
    courses: [
      {
        title: "Create your first wallet",
        href: "/wallet/create-your-first-wallet",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
      },
      {
        title: "Secure your wallet",
        href: "/wallet/secure-your-wallet",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
        tutorial: false,
        new: false,
      },
      {
        title: "Authenticate with your wallet",
        href: "/wallet/authenticate-with-your-wallet",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
      },
      {
        title: "Make your first transaction",
        href: "/wallet/make-your-first-transaction",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
      },
    ],
  },
  {
    category: "Blockchain",
    courses: [
      {
        title: "What is a blockchain?",
        href: "/blockchain/what-is-a-blockchain",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
      },
      {
        title: "Consensus mechanisms",
        href: "/blockchain/consensus-mechanisms",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
      },
    ],
  },
  {
    category: "Bitcoin",
    courses: [
      {
        title: "What is Bitcoin?",
        href: "/bitcoin/what-is-bitcoin",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
      },
      {
        title: "The history of Bitcoin",
        href: "/bitcoin/the-history-of-bitcoin",
        status: "Not started",
        tier: "Intermediate",
        sponsored: false,
        tutorial: false,
        new: false,
      },
    ],
  },
  {
    category: "Ethereum",
    courses: [
      {
        title: "What is Ethereum?",
        href: "/ethereum/what-is-ethereum",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
      },
      {
        title: "Understand the layers 2",
        href: "/ethereum/understand-the-layers-2",
        status: "Not started",
        tier: "Beginner",
        sponsored: false,
        tutorial: false,
        new: false,
      },
    ],
  },
  {
    category: "Governance",
    courses: [
      {
        title: "What are DAOs?",
        href: "/governance/what-are-daos",
        status: "Not started",
        tier: "Expert",
        sponsored: false,
        tutorial: false,
        new: false,
      },
    ],
  },
];

export default function Home() {
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
      <>
        <div className="mx-10 lg:mx-32 mt-10 mb-20">
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
                <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  {lesson.category}
                </h2>
                <div className="mt-4 flex flex-row flex-wrap gap-4">
                  {lesson.courses.map((course) => (
                    <Link
                      href={course.href}
                      key={course.title}
                      className="w-full md:w-full lg:w-1/6 h-full"
                    >
                      <div className="rounded-lg hover:shadow active:shadow-none active:border-blue-600 bg-gray-50 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 backdrop-blur-xl">
                        <div className="px-4 pb-4">
                          <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                            {course.title}
                          </h3>
                          <div className="flex flex-wrap mt-4 gap-2 items-center">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                course.status === "Not started"
                                  ? "bg-gray-600 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
                                  : course.status === "Finished"
                                  ? "bg-green-600 dark:bg-green-200 text-gray-100 dark:text-gray-900"
                                  : course.status === "Ongoing"
                                  ? "bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900"
                                  : ""
                              }`}
                            >
                              {course.status}
                            </span>
                            {course.tier == "Intermediate" && (
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-pink-600 dark:bg-pink-200 text-gray-100 dark:text-gray-900">
                                {course.tier}
                              </span>
                            )}
                            {course.tutorial && (
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-purple-600 dark:bg-purple-200 text-gray-100 dark:text-gray-900">
                                Tutorial
                              </span>
                            )}
                            {course.tier == "Expert" && (
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-red-600 dark:bg-red-200 text-gray-100 dark:text-gray-900">
                                {course.tier}
                              </span>
                            )}
                            {course.sponsored && (
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-yellow-600 dark:bg-yellow-200 text-gray-100 dark:text-gray-900">
                                Sponsored
                              </span>
                            )}
                            {course.new && (
                              <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-200 dark:from-yellow-200 to-lime-200 dark:to-lime-200 text-gray-900 dark:text-gray-900">
                                New
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
    </>
  );
}
