"use client";

import type { Lang } from "@/types/lang";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { loadingFlashClass } from "@/lib/tailwind/loading";
import CountUp from "react-countup";
import Evolution from "@/app/[lang]/statistics/components/statistics/components/evolution";
import { updateEvolution } from "@/lib/statistics/evolution";

const NumberOfLearners = ({ lang }: { lang: Lang }) => {
  const [evolution, setEvolution] = useState<number | null>(null);

  const { data: numberOfLearners } = useSWR(
    "/api/database/getTotalNumberOfLearners",
    fetcher
  );

  useEffect(() => {
    updateEvolution(numberOfLearners, "numberOfLearners", setEvolution);
  }, [numberOfLearners]);

  return (
    <>
      <div
        className={`bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl px-2 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <Evolution evolution={evolution as number} />
        <span className="font-semibold text-2xl md:text-4xl">
          {numberOfLearners ? (
            <>
              <CountUp start={0} end={numberOfLearners} />{" "}
              <span className="hidden md:inline">👨‍💻</span>
            </>
          ) : (
            <span className={`${loadingFlashClass}`}>
              0 <span className="hidden md:inline">👨‍💻</span>
            </span>
          )}
        </span>

        <span>{lang === "en" ? "Learners" : "Apprenants"}</span>
      </div>
    </>
  );
};

export default NumberOfLearners;
