"use client";

import { resolveAddress, useAddress } from "@thirdweb-dev/react";
import { isAddress, Address } from "viem";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [leaderboard, setLeaderboard] = useState<Array<any>>([]);
  const [position, setPosition] = useState<number>(0);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] =
    useState<number>(0);

  const address = useAddress();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch(`/api/database/leaderboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = await response.json();
      if (data) {
        setLeaderboard(data.filteredLeaderboard);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch(
        `/api/database/userLeaderboard?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const data = await response.json();
      if (data) {
        setLeaderboard(data.filteredLeaderboard);
        setPosition(data.position);
        setNumberOfQuizzesAnswered(data.numberOfQuizzesAnswered);
      }
    };

    if (address) {
      fetchLeaderboard();
    }
  }, [address as Address]);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        Your ranking
      </h2>
      {Boolean(position) && Boolean(address) ? (
        <div
          className={`mt-4 bg-gray-50 flex items-center justify-between ${
            position < 4
              ? "rainbow-border"
              : "border-gray-900/20 dark:border-gray-100/40"
          } border backdrop-blur-xl text-center rounded-full p-4 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800">
            {position}
          </div>
          <div>
            {address && typeof address === "string" && isAddress(address)
              ? resolveAddress(address)
              : "Invalid address"}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800">
              {numberOfQuizzesAnswered}
            </div>
            quizzes answered
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Connect your wallet
        </p>
      )}
      <h2 className="mt-6 font-semibold text-gray-900 dark:text-gray-100 text-xl">
        Top 20
      </h2>
      {leaderboard ? (
        <ul className="mt-4">
          {leaderboard.map((entry, index) => (
            <li key={index}>
              <div
                className={`mt-2 bg-gray-50 flex items-center justify-between ${
                  position < 4
                    ? "rainbow-border"
                    : "border-gray-900/20 dark:border-gray-100/40"
                } border backdrop-blur-xl text-center rounded-full p-4 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800">
                  {index + 1}
                </div>
                <div>
                  {entry.wallet &&
                  typeof entry.wallet === "string" &&
                  isAddress(entry.wallet)
                    ? resolveAddress(entry.wallet as Address)
                    : "Invalid address"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800">
                    {numberOfQuizzesAnswered}
                  </div>
                  quizzes answered
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 animate__animated animate__flash animate__slower animate__infinite text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      )}
    </>
  );
};

export default Page;
