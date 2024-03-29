import type { Lang } from "@/types/lang";
import React, { useContext } from "react";
import StreakContext from "@/app/[lang]/contexts/streakContext";
import { useAccount } from "wagmi";
import { Address } from "viem";
import BlueButton from "@/app/[lang]/components/blueButton";
import "animate.css";

const StreakMobile = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { streak, disabled, updateStreak, cooldown, isStreakLoading } =
    useContext(StreakContext);

  return (
    <>
      <div className="relative">
        <div className="flex flex-col border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-900 dark:text-gray-100 divide-y divide-gray-900/10 dark:divide-gray-100/10">
          <div className="flex gap-2 items-center justify-between p-4">
            <h3>{lang === "en" ? "Your streak" : "Votre série"}</h3>
            <div className="flex gap-2 items-center">
              <span>{cooldown}</span>
              <div className="border-r border-gray-900/10 dark:border-gray-100/10 h-6" />
              <span>{streak} 🔥</span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 p-4">
            <BlueButton
              isFull={true}
              lang={lang}
              text={
                disabled
                  ? lang === "en"
                    ? "Comeback tomorrow"
                    : "Revenez demain"
                  : lang === "en"
                  ? "Increase your streak"
                  : "Augmentez votre série"
              }
              onClick={() => {
                if (!disabled) {
                  updateStreak(address as Address);
                }
              }}
              disabled={disabled}
              isLoading={isStreakLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StreakMobile;
