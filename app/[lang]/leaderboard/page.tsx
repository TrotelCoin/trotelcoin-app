"use client";

import {
  resolveAddress,
  shortenAddress,
  useAddress,
} from "@thirdweb-dev/react";
import { isAddress, Address } from "viem";
import React, { useEffect, useState } from "react";
import { Lang } from "@/types/types";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [leaderboard, setLeaderboard] = useState<Array<any> | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);
  const [streak, setStreak] = useState<number | null>(null);

  const address = useAddress();

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardPromise = fetch(`/api/database/leaderboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }).then((response) => response.json());

      const userLeaderboardPromise = address
        ? fetch(`/api/database/userLeaderboard?wallet=${address}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }).then((response) => response.json())
        : Promise.resolve(null);

      const [leaderboardData, userLeaderboardData] = await Promise.all([
        leaderboardPromise,
        userLeaderboardPromise,
      ]);

      if (leaderboardData) {
        setLeaderboard(leaderboardData.updatedLeaderboard);
      }

      if (userLeaderboardData) {
        setPosition(userLeaderboardData.position);
        setNumberOfQuizzesAnswered(userLeaderboardData.numberOfQuizzesAnswered);
        setStreak(userLeaderboardData.streak);
      }
    };

    fetchData();
  }, [address]);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        Your ranking
      </h2>
      <div
        className={`mt-4 bg-gray-50 flex items-center justify-between ${
          (position as number) < 4
            ? "rainbow-border"
            : "border-gray-900/20 dark:border-gray-100/40"
        } border backdrop-blur-xl text-center rounded-full p-4 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800">
          <React.Suspense fallback={0}>{position ?? 0}</React.Suspense>
        </div>
        <div className="hidden md:block">
          <React.Suspense
            fallback={
              lang === "en"
                ? "Connect your wallet"
                : "Connecte ton portefeuille"
            }
          >
            {address && typeof address === "string" && isAddress(address)
              ? resolveAddress(address)
              : lang === "en"
              ? "Connect your wallet"
              : "Connecte ton portefeuille"}
          </React.Suspense>
        </div>
        <div className="block md:hidden">
          <React.Suspense
            fallback={
              lang === "en"
                ? "Connect your wallet"
                : "Connecte ton portefeuille"
            }
          >
            {address
              ? shortenAddress(address)
              : lang === "en"
              ? "Connect your wallet"
              : "Connecte ton portefeuille"}
          </React.Suspense>
        </div>

        <div className="flex items-center gap-2 text-lg">
          <span>
            <React.Suspense fallback={"0 📚"}>
              {numberOfQuizzesAnswered ?? 0} 📚
            </React.Suspense>
          </span>
          <span>
            <React.Suspense fallback={"0 🔥"}>{streak ?? 0} 🔥</React.Suspense>
          </span>
        </div>
      </div>
      <h2 className="mt-6 font-semibold text-gray-900 dark:text-gray-100 text-xl">
        Top 20
      </h2>
      <ul className="mt-4">
        <React.Suspense
          fallback={
            <span className="mt-2 text-gray-700 dark:text-gray-300 animate__animated animate__flash animate__slower animate__infinite">
              {lang === "en" ? "Loading..." : "Chargement..."}
            </span>
          }
        >
          {leaderboard &&
            leaderboard.map((entry, index) => (
              <li key={index}>
                <div
                  className={`mt-2 bg-gray-50 flex items-center justify-between ${
                    index < 3
                      ? "rainbow-border"
                      : "border-gray-900/20 dark:border-gray-100/40"
                  } border backdrop-blur-xl text-center rounded-full p-4 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800">
                    {index + 1}
                  </div>
                  <div className="hidden md:block">
                    <React.Suspense
                      fallback={lang === "en" ? "Loading..." : "Chargement..."}
                    >
                      {entry.wallet &&
                      typeof entry.wallet === "string" &&
                      isAddress(entry.wallet)
                        ? resolveAddress(entry.wallet as Address)
                        : lang === "en"
                        ? "Loading..."
                        : "Chargement..."}
                    </React.Suspense>
                  </div>
                  <div className="block md:hidden">
                    <React.Suspense
                      fallback={lang === "en" ? "Loading..." : "Chargement..."}
                    >
                      {entry.wallet
                        ? shortenAddress(entry.wallet)
                        : lang === "en"
                        ? "Loading..."
                        : "Chargement..."}
                    </React.Suspense>
                  </div>
                  <div className="flex items-center gap-2 text-lg">
                    <span>
                      <React.Suspense fallback={"0 📚"}>
                        {leaderboard[index].number_of_quizzes_answered ?? 0} 📚
                      </React.Suspense>
                    </span>
                    <span>
                      <React.Suspense fallback={"0 🔥"}>
                        {leaderboard[index].current_streak ?? 0} 🔥
                      </React.Suspense>
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </React.Suspense>
      </ul>
    </>
  );
};

export default Page;
