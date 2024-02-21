"use client";

import React from "react";
import { Lang } from "@/types/types";
import UserLeaderboard from "@/app/[lang]/leaderboard/components/userLeaderboard";
import Leaderboard from "@/app/[lang]/leaderboard/components/leaderboard";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        Your ranking
      </h2>
      <UserLeaderboard lang={lang} />
      <h2 className="mt-6 font-semibold text-gray-900 dark:text-gray-100 text-xl">
        Top 20
      </h2>
      <Leaderboard lang={lang} />
    </>
  );
};

export default Page;
