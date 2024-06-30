import type { Lang } from "@/types/language/lang";
import { Transition } from "@headlessui/react";
import { useAccount } from "wagmi";
import React, { Fragment, useContext, useEffect, useState } from "react";
import StreakContext from "@/contexts/streak";
import { Address } from "viem";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import "animate.css";

const StreakCount = ({ lang }: { lang: Lang }) => {
  const [isHoveringStreak, setIsHoveringStreak] = useState<boolean>(false);
  const [streakCooldown, setStreakCooldown] = useState<string | null>(null);

  const { address } = useAccount();

  const {
    streak,
    disabled,
    lastUpdatedStreak,
    cooldown,
    updateStreak,
    isStreakLoading
  } = useContext(StreakContext);

  useEffect(() => {
    if (lastUpdatedStreak && disabled) {
      const lastUpdated = new Date(lastUpdatedStreak);
      const now = new Date();
      const difference = now.getTime() - lastUpdated.getTime();
      if (difference > 86400000) {
        setStreakCooldown("Increase your streak");
      } else {
        const cooldown = 86400000 - difference;
        const cooldownString = new Date(cooldown).toISOString();
        const time = cooldownString.split("T")[1].split(".")[0];
        setStreakCooldown(time);
      }
    } else {
      setStreakCooldown("00:00:00");
    }
  }, [lastUpdatedStreak, disabled]);

  return (
    <>
      <div
        className="relative flex cursor-pointer items-center justify-center gap-1 text-xl text-gray-900 dark:text-gray-100"
        onMouseEnter={() => setIsHoveringStreak(true)}
        onMouseLeave={() => setIsHoveringStreak(false)}
      >
        {streak ? (
          <span className="font-semibold">{streak}</span>
        ) : (
          <span className="font-semibold">0</span>
        )}{" "}
        <span>
          {!address
            ? "❌"
            : streakCooldown === "Increase your streak" ||
                streakCooldown === "Augmentez votre série" ||
                streakCooldown === "00:00:00" ||
                cooldown === "00:00:00"
              ? "🔥"
              : "⏳"}
        </span>
        <Transition
          as={Fragment}
          show={isHoveringStreak}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div
            className="absolute z-10 mt-3 flex justify-center bg-white text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100"
            style={{ width: "300px" }}
          >
            <div className="absolute top-5 z-50 flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-900/10 bg-white p-4 dark:border-gray-100/10 dark:bg-gray-800">
              <p className="font-semibold">
                {lang === "en" ? "Your streak" : "Votre série"}
              </p>
              <BlueButton
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
                  () => updateStreak(address as Address);
                }}
                disabled={disabled}
                isLoading={isStreakLoading}
              />
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default StreakCount;
