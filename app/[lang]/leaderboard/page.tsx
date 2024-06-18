"use client";

import React from "react";
import type { Lang } from "@/types/language/lang";
import UserLeaderboard from "@/app/[lang]/leaderboard/components/userLeaderboard";
import Leaderboard from "@/app/[lang]/leaderboard/components/leaderboard";

const Page = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {lang === "en" ? "Your ranking" : "Votre classement"}
        </h2>
        <UserLeaderboard lang={lang} />
        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Top 20
        </h2>
        <Leaderboard lang={lang} />
      </div>
    </>
  );
};

export default Page;
