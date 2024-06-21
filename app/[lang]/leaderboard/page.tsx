"use client";

import React, { useEffect, useState } from "react";
import type { Lang } from "@/types/language/lang";
import UserLeaderboard from "@/app/[lang]/leaderboard/components/userLeaderboard";
import MarksLeaderboard from "@/app/[lang]/leaderboard/components/marksLeaderboard";
import LeaderboardCategory from "@/app/[lang]/leaderboard/components/leaderboardCategory";
import {
  LeaderboardCategories,
  LeaderboardItem
} from "@/types/leaderboard/leaderboard";
import { fetcher } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { getEnsName } from "@wagmi/core";
import { config } from "@/config/Web3ModalConfig";
import { Address, isAddress } from "viem";
import { mainnet } from "viem/chains";
import QuizzesAnsweredLeaderboard from "@/app/[lang]/leaderboard/components/quizzesAnsweredLeaderboard";
import RewardsLeaderboard from "@/app/[lang]/leaderboard/components/rewardsLeaderboard";
import LearningTimeLeaderboard from "@/app/[lang]/leaderboard/components/learningTimeLeaderboard";
import StreaksLeaderboard from "@/app/[lang]/leaderboard/components/streaksLeaderboard";
import { sortLeaderboardFromCategory } from "@/utils/leaderboard/leaderboard";

const numberOfItems = 50;

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [category, setCategory] = useState<LeaderboardCategories>("rewards");
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | null>(
    null
  );
  const [ensFetched, setEnsFetched] = useState<boolean>(false);
  const [sortedLeaderboard, setSortedLeaderboard] = useState<
    LeaderboardItem[] | null
  >(null);
  const [mount, setMount] = useState<boolean>(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] =
    useState<boolean>(true);

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
    const isLoading =
      isFetchingLeaderboard || !leaderboard || !sortedLeaderboard;

    if (isLoading) {
      setIsLoadingLeaderboard(true);
    } else {
      setIsLoadingLeaderboard(false);
    }
  }, [isFetchingLeaderboard, leaderboard, sortedLeaderboard]);

  useEffect(() => {
    const fetchEns = async (address: Address) => {
      try {
        const result = await getEnsName(config, {
          address: address,
          chainId: mainnet.id
        });
        return result ?? address;
      } catch (error) {
        return address;
      }
    };

    const fetchLeaderboard = async (leaderboard: LeaderboardItem[]) => {
      const promises = leaderboard.map(async (entry: LeaderboardItem) => {
        if (entry.wallet && isAddress(entry.wallet)) {
          entry.wallet = await fetchEns(entry.wallet);
        }
        return entry;
      });

      const updatedLeaderboard = await Promise.all(promises);
      setEnsFetched(true);
      setLeaderboard(updatedLeaderboard);
    };

    if (leaderboard && !ensFetched) {
      fetchLeaderboard(leaderboard);
    }
  }, [leaderboard, ensFetched]);

  useEffect(() => {
    const sortLeaderboard = async () => {
      const sorted = await sortLeaderboardFromCategory(
        leaderboard as LeaderboardItem[],
        category
      );
      setSortedLeaderboard(sorted);
    };

    if (leaderboard) {
      sortLeaderboard();
    }
  }, [category, leaderboard]);

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Your ranking" : "Votre classement"}
        </h2>

        <UserLeaderboard
          lang={lang}
          leaderboard={sortedLeaderboard}
          category={category}
          isLoadingLeaderboard={isLoadingLeaderboard}
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
            leaderboard={sortedLeaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}

        {category === "learningTime" && (
          <LearningTimeLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={sortedLeaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}

        {category === "numberOfQuizzesAnswered" && (
          <QuizzesAnsweredLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={sortedLeaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}

        {category === "marks" && (
          <MarksLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={sortedLeaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}

        {category === "streaks" && (
          <StreaksLeaderboard
            isLoadingLeaderboard={isLoadingLeaderboard}
            leaderboard={sortedLeaderboard as LeaderboardItem[]}
            numberOfItems={numberOfItems}
          />
        )}
      </div>
    </>
  );
};

export default Page;
