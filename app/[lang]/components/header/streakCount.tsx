import { DictType, Lang } from "@/types/types";
import { Transition } from "@headlessui/react";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Address } from "viem";
import StreakContext from "@/app/[lang]/streakContext";

const StreakCount = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
  const [isHoveringStreak, setIsHoveringStreak] = useState<boolean>(false);
  const [streakCooldown, setStreakCooldown] = useState<string | null>(null);

  const address = useAddress();

  const { streak, disabled, lastUpdatedStreak, cooldown } =
    useContext(StreakContext);

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
        className="relative flex justify-center gap-1 text-xl items-center text-gray-900 dark:text-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHoveringStreak(true)}
        onMouseLeave={() => setIsHoveringStreak(false)}
      >
        {streak ? (
          <span className="font-semibold">{streak}</span>
        ) : (
          <span className="font-semibold">0</span>
        )}{" "}
        {!address
          ? "❌"
          : streakCooldown === "Increase your streak" ||
            streakCooldown === "Augmentez votre série" ||
            streakCooldown === "00:00:00" ||
            cooldown === "00:00:00"
          ? "🔥"
          : "⏳"}
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
            className="absolute flex justify-center bg-white dark:bg-gray-800 z-10 mt-3 text-sm text-gray-900 dark:text-gray-100"
            style={{ width: "300px" }}
          >
            <div className="absolute flex flex-col gap-4 bg-white dark:bg-gray-800 justify-center items-center top-5 z-50 border border-gray-900/20 dark:border-gray-100/20 p-4 rounded-xl">
              <p>
                {typeof dict?.header !== "string" && (
                  <>{dict?.header.streakMessage}</>
                )}
              </p>
              {streakCooldown && cooldown && (
                <p>
                  {streakCooldown !==
                    ("Increase your streak" || "Augmentez votre série") &&
                    (lang === "en"
                      ? "Reset in:"
                      : "Réinitialisation dans:")}{" "}
                  {cooldown}
                </p>
              )}
              <Link href={`/${lang}/learn`}>
                <button className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-300 dark:hover:bg-blue-400 hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-100 dark:text-gray-900 rounded-lg font-semibold">
                  {typeof dict?.header !== "string" && (
                    <>{dict?.header.streakButton}</>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default StreakCount;
