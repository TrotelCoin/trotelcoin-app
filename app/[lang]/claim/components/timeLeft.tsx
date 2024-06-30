"use client";

import type { Lang } from "@/types/language/lang";
import React from "react";
import { Skeleton } from "@radix-ui/themes";

const TimeLeft = ({
  lang,
  timeLeft,
  isLoadingTimeLeft
}: {
  lang: Lang;
  timeLeft: number;
  isLoadingTimeLeft: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Time Left" : "Temps restant"}</span>
        <Skeleton loading={isLoadingTimeLeft}>
          <div>
            {timeLeft > 0 ? timeLeft.toLocaleString("en-US") : 0} mins left
          </div>{" "}
        </Skeleton>
      </div>
    </>
  );
};

export default TimeLeft;
