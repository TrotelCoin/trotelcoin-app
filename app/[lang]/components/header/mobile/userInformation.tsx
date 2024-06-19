"use client";

import { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import PremiumContext from "@/contexts/premium";
import TrotelCoinLogo from "@/app/[lang]/components/trotelCoinLogo";
import UserContext from "@/contexts/user";
import TrotelPriceContext from "@/contexts/trotelPrice";
import { roundPrice } from "@/utils/price/roundPrice";

const UserInformationMobile = ({
  lang,
  streak,
  life,
  userTotalRewardsPending,
  userNumberOfQuizzesAnswered,
  isPremium
}: {
  lang: Lang;
  streak: number | null;
  life: number | null;
  userTotalRewardsPending: number | null;
  userNumberOfQuizzesAnswered: number | null;
  isPremium: boolean;
}) => {
  const { isIntermediate, isExpert } = useContext(PremiumContext);
  const { multipliers, userLevel, averageMark } = useContext(UserContext);
  const { trotelPrice, showTrotelInUsdc } = useContext(TrotelPriceContext);

  return (
    <>
      <Marquee>
        <div className="mx-8 flex w-full items-center gap-16 rounded-full font-semibold text-gray-900 dark:text-gray-100">
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
          <div className="flex items-center">{streak as number} 🔥</div>
          <div className="flex items-center">
            {isPremium ? (
              <span className="mr-1 text-xl">&infin;</span>
            ) : (
              life ?? 3
            )}{" "}
            {life && life > 0 ? "💙" : "💔"}
          </div>
          <div
            className={`flex items-center ${
              multipliers && multipliers > 1 && "rainbow-text"
            }`}
          >
            x{multipliers ?? 1} 🤑
          </div>
          <div className="flex items-center gap-1">
            <span>
              {showTrotelInUsdc && "$"}

              {userTotalRewardsPending &&
                !showTrotelInUsdc &&
                roundPrice(Number(userTotalRewardsPending)).toLocaleString(
                  "en-US"
                )}

              {showTrotelInUsdc &&
                userTotalRewardsPending &&
                roundPrice(
                  userTotalRewardsPending * (trotelPrice as number)
                ).toLocaleString("en-US")}
            </span>
            <TrotelCoinLogo />
          </div>
          <div className="flex items-center">
            {userNumberOfQuizzesAnswered as number} 📚
          </div>
          <div className="flex items-center">
            {lang === "en" ? "Level" : "Niveau"} {userLevel ?? 1} 💊
          </div>
          <div className="flex items-center">
            {Math.floor(averageMark as number)}/20 🤓
          </div>
        </div>
      </Marquee>
    </>
  );
};

export default UserInformationMobile;
