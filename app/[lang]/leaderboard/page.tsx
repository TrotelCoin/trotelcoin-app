"use client";

import {
  resolveAddress,
  shortenAddress,
  useAddress,
} from "@thirdweb-dev/react";
import { isAddress, Address } from "viem";
import React, { useEffect, useState } from "react";
import { Lang } from "@/types/types";
import { supabase } from "@/lib/supabase/db";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [leaderboard, setLeaderboard] = useState<Array<any> | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [numberOfQuizzesAnswered, setNumberOfQuizzesAnswered] = useState<
    number | null
  >(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] =
    useState<boolean>(true);
  const [isLoadingUserLeaderboard, setIsLoadingUserLeaderboard] =
    useState<boolean>(true);

  const address = useAddress();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoadingLeaderboard(true);
      const leaderboard = await fetch(`/api/database/leaderboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }).then((response) => response.json());

      if (leaderboard) {
        setLeaderboard(leaderboard.updatedLeaderboard);
      } else {
        setLeaderboard(null);
      }
      setIsLoadingLeaderboard(false);
    };

    const fetchUserLeaderboard = async () => {
      setIsLoadingUserLeaderboard(true);
      const userLeaderboard = await fetch(
        `/api/database/userLeaderboard?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      ).then((response) => response.json());

      if (userLeaderboard) {
        setPosition(userLeaderboard.position);
        setNumberOfQuizzesAnswered(userLeaderboard.numberOfQuizzesAnswered);
        setStreak(userLeaderboard.streak);
      } else {
        setPosition(null);
        setNumberOfQuizzesAnswered(null);
        setStreak(null);
      }
      setIsLoadingUserLeaderboard(false);
    };

    fetchLeaderboard();

    if (address) {
      fetchUserLeaderboard();
    } else {
      setPosition(null);
      setNumberOfQuizzesAnswered(null);
      setStreak(null);
    }
  }, [address]);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        Your ranking
      </h2>
      <React.Suspense fallback={null}>
        {isLoadingUserLeaderboard ? (
          <>
            <p className="mt-2 text-gray-700 dark:text-gray-300 animate__animated animate__slower animate__flash animate__infinite">
              {lang === "en" ? <>Loading...</> : <>Chargement...</>}
            </p>
          </>
        ) : (
          <>
            {address ? (
              <>
                {position && (
                  <div
                    className={`mt-4 bg-gray-50 flex items-center justify-between ${
                      position < 4
                        ? "rainbow-border"
                        : "border-gray-900/20 dark:border-gray-100/40"
                    } border backdrop-blur-xl text-center rounded-full p-4 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800">
                      {position ? position : 0}
                    </div>
                    <div className="hidden md:block">
                      {address &&
                      typeof address === "string" &&
                      isAddress(address)
                        ? resolveAddress(address)
                        : lang === "en"
                        ? "Connect your wallet"
                        : "Connecte ton portefeuille"}
                    </div>
                    <div className="block md:hidden">
                      {address
                        ? shortenAddress(address)
                        : lang === "en"
                        ? "Connect your wallet"
                        : "Connecte ton portefeuille"}
                    </div>

                    <div className="flex items-center gap-2 text-lg">
                      <span>
                        {numberOfQuizzesAnswered ? numberOfQuizzesAnswered : 0}{" "}
                        📚
                      </span>
                      <span>{streak ? streak : 0} 🔥</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {lang === "en" ? (
                    <>Connect your wallet</>
                  ) : (
                    <>Connecte ton portefeuille</>
                  )}
                </p>
              </>
            )}
          </>
        )}
      </React.Suspense>
      <h2 className="mt-6 font-semibold text-gray-900 dark:text-gray-100 text-xl">
        Top 20
      </h2>
      <React.Suspense fallback={null}>
        <ul className="mt-4">
          {!isLoadingLeaderboard ? (
            <>
              {leaderboard &&
                Array.isArray(leaderboard) &&
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
                        {entry.wallet &&
                        typeof entry.wallet === "string" &&
                        isAddress(entry.wallet)
                          ? resolveAddress(entry.wallet as Address)
                          : lang === "en"
                          ? "Loading..."
                          : "Chargement..."}
                      </div>
                      <div className="block md:hidden">
                        {entry.wallet
                          ? shortenAddress(entry.wallet)
                          : lang === "en"
                          ? "Loading..."
                          : "Chargement..."}
                      </div>
                      <div className="flex items-center gap-2 text-lg">
                        <span>
                          {leaderboard &&
                          leaderboard[index].number_of_quizzes_answered
                            ? leaderboard[index].number_of_quizzes_answered
                            : 0}{" "}
                          📚
                        </span>
                        <span>
                          {leaderboard && leaderboard[index].current_streak
                            ? leaderboard[index].current_streak
                            : 0}{" "}
                          🔥
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </>
          ) : (
            <>
              <p className="mt-2 text-gray-700 dark:text-gray-300 animate__animated animate__slower animate__flash animate__infinite">
                {lang === "en" ? <>Loading...</> : <>Chargement...</>}
              </p>
            </>
          )}
        </ul>
      </React.Suspense>
    </>
  );
};

export default Page;
