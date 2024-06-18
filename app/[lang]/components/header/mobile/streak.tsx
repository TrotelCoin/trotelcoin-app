import type { Lang } from "@/types/language/lang";
import React, { useContext } from "react";
import StreakContext from "@/contexts/streak";
import { useAccount } from "wagmi";
import { Address } from "viem";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import "animate.css";

const StreakMobile = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();

  const { streak, disabled, updateStreak, cooldown, isStreakLoading } =
    useContext(StreakContext);

  return (
    <>
      <div className="relative">
        <div className="flex flex-col divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white text-gray-900 dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex items-center justify-between gap-2 p-4">
            <h3>{lang === "en" ? "Your streak" : "Votre série"}</h3>
            <div className="flex items-center gap-2">
              <span>{cooldown}</span>
              <div className="h-6 border-r border-gray-900/10 dark:border-gray-100/10" />
              <span>{streak} 🔥</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-4">
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
