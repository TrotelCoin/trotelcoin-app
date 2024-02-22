import { DictType, Lang } from "@/types/types";
import { Transition } from "@headlessui/react";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Address } from "viem";

const StreakCount = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
  const [streak, setStreak] = useState<number | null>(null);
  const [isHoveringStreak, setIsHoveringStreak] = useState<boolean>(false);

  const [streakCountdown, setStreakCountdown] = useState<string | null>(null);
  const [streakCooldown, setStreakCooldown] = useState<string | null>(null);

  const address = useAddress();

  useEffect(() => {
    const fetchUserStreak = async () => {
      await fetch(`/api/database/streak?wallet=${address as Address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          setStreak(data.currentStreak);
        });
    };

    if (address) {
      fetchUserStreak();

      const interval = setInterval(fetchUserStreak, 10000);

      return () => clearInterval(interval);
    } else {
      setStreak(0);
      setStreakCountdown(null);
    }
  }, [address, streak]);

  useEffect(() => {
    const fetchResetStreakCountdown = async () => {
      const result = await fetch(
        `/api/database/streak?wallet=${address as Address}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setStreakCountdown(data.lastUpdated);
    };

    if (address) {
      fetchResetStreakCountdown();

      const interval = setInterval(fetchResetStreakCountdown, 1000);

      return () => clearInterval(interval);
    } else {
      setStreakCountdown(null);
    }
  }, [address]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (streakCountdown) {
        const lastUpdated = new Date(streakCountdown);
        const now = new Date();
        const difference = now.getTime() - lastUpdated.getTime();
        if (difference > 86400000) {
          setStreakCooldown(
            lang === "en" ? "Increase your streak" : "Augmente ta série"
          );
        } else {
          const cooldown = 86400000 - difference;
          const cooldownString = new Date(cooldown).toISOString();
          const time = cooldownString.split("T")[1].split(".")[0];
          setStreakCooldown(time);
        }
      } else {
        setStreakCooldown("00:00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [streakCountdown, lang]);

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
        🔥
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
              {streakCooldown && (
                <p>
                  {lang === "en" ? "Reset in:" : "Réinitialisation dans:"}{" "}
                  {streakCooldown}
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
