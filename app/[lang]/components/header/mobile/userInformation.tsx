"use client";

import { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import PremiumContext from "@/contexts/premium";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import UserContext from "@/contexts/user";

const UserInformationMobile = ({
  lang,
  streak,
  life,
  userTotalRewardsPending,
  userNumberOfQuizzesAnswered,
  isPremium,
}: {
  lang: Lang;
  streak: number;
  life: number;
  userTotalRewardsPending: number;
  userNumberOfQuizzesAnswered: number;
  isPremium: boolean;
}) => {
  const { isIntermediate, isExpert } = useContext(PremiumContext);
  const { multipliers, userLevel, averageMark } = useContext(UserContext);

  return (
    <>
      <Marquee>
        <div className="flex rounded-full items-center gap-16 w-full text-gray-900 dark:text-gray-100 font-semibold mx-8">
          <div className="flex items-center">
            <span className={`${isPremium && "rainbow-text"}`}>
              {isExpert
                ? lang === "en"
                  ? "Expert 🦊"
                  : "Expert 🦊"
                : isIntermediate
                ? lang === "en"
                  ? "Intermediate 🙈"
                  : "Intermédiaire 🙈"
                : lang === "en"
                ? "Beginner 🐣"
                : "Débutant 🐣"}
            </span>
          </div>
          <div className="flex items-center">{streak} 🔥</div>
          <div className="flex items-center">
            {isPremium ? <span className="text-xl mr-1">&infin;</span> : life}{" "}
            {life > 0 ? "💙" : "💔"}
          </div>
          <div
            className={`flex items-center ${multipliers > 1 && "rainbow-text"}`}
          >
            x{multipliers} 🤑
          </div>
          <div className="flex items-center gap-1">
            {Number(userTotalRewardsPending.toFixed(0)).toLocaleString("en-US")}{" "}
            <TrotelCoinLogo />
          </div>
          <div className="flex items-center">
            {userNumberOfQuizzesAnswered} 📚
          </div>
          <div className="flex items-center">
            {lang === "en" ? "Level" : "Niveau"} {userLevel} 💊
          </div>
          <div className="flex items-center">
            {Math.floor(averageMark)}/20 🤓
          </div>
        </div>
      </Marquee>
    </>
  );
};

export default UserInformationMobile;
