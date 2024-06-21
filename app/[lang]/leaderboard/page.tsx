"use client";

import React, { useEffect, useState } from "react";
import type { Lang } from "@/types/language/lang";
import UserLeaderboard from "@/app/[lang]/leaderboard/components/userLeaderboard";
import MarksLeaderboard from "@/app/[lang]/leaderboard/components/marksLeaderboard";
import LeaderboardCategory from "@/app/[lang]/leaderboard/components/leaderboardCategory";
import type {
  LeaderboardCategories,
  LeaderboardItem,
  Positions
} from "@/types/leaderboard/leaderboard";
import { fetcher } from "@/utils/axios/fetcher";
import useSWR from "swr";
import QuizzesAnsweredLeaderboard from "@/app/[lang]/leaderboard/components/quizzesAnsweredLeaderboard";
import RewardsLeaderboard from "@/app/[lang]/leaderboard/components/rewardsLeaderboard";
import LearningTimeLeaderboard from "@/app/[lang]/leaderboard/components/learningTimeLeaderboard";
import StreaksLeaderboard from "@/app/[lang]/leaderboard/components/streaksLeaderboard";
import {
  getPositionsFromCategory,
  getUserLeaderboard
} from "@/utils/leaderboard/leaderboard";
import { useAccount } from "wagmi";
import type { Address } from "viem";

const numberOfItems = 50;

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [category, setCategory] = useState<LeaderboardCategories>("rewards");
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | null>(
    null
  );
  const [ensFetched, setEnsFetched] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] =
    useState<boolean>(true);
  const [positions, setPositions] = useState<Positions | null>(null);
  const [userLeaderboardItem, setUserLeaderboardItem] =
    useState<LeaderboardItem | null>(null);

  const { address } = useAccount();

  const { data: leaderboardData, isLoading: isFetchingLeaderboard } = useSWR(
    `/api/leaderboard`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  useEffect(() => {
    if (leaderboardData && !mount) {
      setLeaderboard(leaderboardData.updatedLeaderboard);
      setMount(true);
    }
  }, [leaderboardData, mount]);

  useEffect(() => {
    const isLoading = isFetchingLeaderboard || !leaderboard;

    if (isLoading) {
      setIsLoadingLeaderboard(true);
    } else {
      setIsLoadingLeaderboard(false);
    }
  }, [isFetchingLeaderboard, leaderboard]);

  useEffect(() => {
    const getPositions = () => {
      const positions: Positions = getPositionsFromCategory(
        leaderboard as LeaderboardItem[],
        address as Address
      );

      setPositions(positions);
    };

    const getUserLeaderboardItem = () => {
      const userLeaderboard = getUserLeaderboard(
        leaderboard as LeaderboardItem[],
        address as Address
      );

      setUserLeaderboardItem(userLeaderboard);
    };

    if (leaderboard) {
      getPositions();
      getUserLeaderboardItem();
    }
  }, [leaderboard, address]);

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Your ranking" : "Votre classement"}
        </h2>

        <UserLeaderboard
          lang={lang}
          category={category}
          isLoadingLeaderboard={isLoadingLeaderboard}
          positions={positions}
          userLeaderboard={userLeaderboardItem}
          address={address}
        />

        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Top {numberOfItems}
        </h2>

        <LeaderboardCategory
          lang={lang}
          category={category}
          setCategory={setCategory}
        />

        {category === "rewards" && (
          <RewardsLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={leaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}

        {category === "learningTime" && (
          <LearningTimeLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={leaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}

        {category === "numberOfQuizzesAnswered" && (
          <QuizzesAnsweredLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={leaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}

        {category === "marks" && (
          <MarksLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={leaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}

        {category === "streaks" && (
          <StreaksLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={leaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}
      </div>
    </>
  );
};

export default Page;
