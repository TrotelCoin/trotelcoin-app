"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/ui/interface/comingSoon";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Address } from "viem";
import { useAddress } from "@thirdweb-dev/react";

interface StreakSectionProps {
  streak: number;
  disabled: boolean;
  dict: DictType | null;
  cooldown: string;
  updateStreak: (address: Address) => void;
  address: Address;
  maxStreak: number;
}

const StreakSection: React.FC<StreakSectionProps> = ({
  dict,
  streak,
  disabled,
  cooldown,
  updateStreak,
  address,
  maxStreak,
}) => (
  <>
    <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
      {typeof dict?.learn !== "string" && <>{dict?.learn.streak}</>}
    </h2>
    <p className="text-gray-700 dark:text-gray-300">
      {address &&
        (disabled
          ? typeof dict?.learn !== "string" && <>{dict?.learn.streakDisabled}</>
          : typeof dict?.learn !== "string" && (
              <>{dict?.learn.streakEnabled}</>
            ))}
      {!address &&
        typeof dict?.modals !== "string" &&
        dict?.modals.connectWallet !== "string" &&
        typeof dict?.modals.connectWallet !== "string" &&
        dict?.modals.connectWallet.message && (
          <>{dict?.modals.connectWallet.message}</>
        )}
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
      <button
        className={`${
          disabled
            ? "cursor-not-allowed"
            : "hover:border-gray-900/50 dark:hover:border-gray-100/50 active:border-yellow-500 dark:active:border-yellow-300"
        } bg-gray-50 dark:bg-gray-900 border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 text-gray-900 dark:text-gray-100`}
        onClick={() => {
          if (!disabled) {
            updateStreak(address);
          }
        }}
      >
        <span className="text-2xl md:text-4xl text-center mx-auto">
          {!disabled ? "🔥" : "⏳"}
        </span>
      </button>
      <div className="bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <span className="text-2xl md:text-4xl font-semibold">
          {streak}
          <p className="font-normal text-base">
            {typeof dict?.learn !== "string" && <>{dict?.learn.streak}</>}
          </p>
        </span>
      </div>
      <div className="bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <span className="text-2xl md:text-4xl font-semibold">
          {maxStreak}
          <p className="font-normal text-base">
            {typeof dict?.learn !== "string" && <>{dict?.learn.maxStreak}</>}
          </p>
        </span>
      </div>
      <div className="bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/40 text-center rounded-lg px-2 py-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <span className="text-2xl md:text-4xl font-semibold">
          {cooldown && <>{cooldown}</>}
          <p className="font-normal text-base">
            {typeof dict?.learn !== "string" && <>{dict?.learn.cooldown}</>}
          </p>
        </span>
      </div>
    </div>
  </>
);

const Learn = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [dict, setDict] = useState<DictType | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [lastUpdatedStreak, setLastUpdatedStreak] = useState<string>("");
  const [cooldown, setCooldown] = useState<string>("00:00:00");
  const [maxStreak, setMaxStreak] = useState<number>(0);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const address = useAddress();

  useEffect(() => {
    const fetchStreak = async () => {
      const result = await fetch(`/api/database/streak?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = await result.json();
      if (Number(data.currentStreak)) {
        setStreak(data.currentStreak);
      }
      setLastUpdatedStreak(data.lastUpdated);
      setDisabled(data.disabled);
    };

    if (address) {
      fetchStreak();

      const interval = setInterval(fetchStreak, 10000);

      return () => clearInterval(interval);
    }

    if (!address) {
      setStreak(0);
      setCooldown("00:00:00");
      setDisabled(false);
    }
  }, [address, streak, maxStreak, disabled]);

  useEffect(() => {
    const fetchMaxStreak = async () => {
      const result = await fetch(
        `/api/database/userMaxStreak?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setMaxStreak(data);
    };

    if (address) {
      fetchMaxStreak();

      const interval = setInterval(fetchMaxStreak, 10000);

      return () => clearInterval(interval);
    }

    if (!address) {
      setMaxStreak(0);
    }
  }, [address, streak, maxStreak, disabled]);

  const updateStreak = async (address: Address) => {
    const result = await fetch(`/api/database/updateStreak?wallet=${address}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if success from response is true, then setStreak to streak + 1
    const data = await result.json();
    if (data.success === "Streak updated.") {
      setStreak((streak) => streak + 1);
      setMaxStreak((maxStreak) => Math.max(maxStreak, streak + 1));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdatedStreak && disabled) {
        const lastUpdated = new Date(lastUpdatedStreak);
        const now = new Date();
        const difference = now.getTime() - lastUpdated.getTime();
        const cooldown = 86400000 - difference;
        const cooldownString = new Date(cooldown).toISOString();
        const time = cooldownString.split("T")[1].split(".")[0];
        setCooldown(time);
      } else {
        setCooldown("00:00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdatedStreak, disabled]);

  return (
    <>
      <div className="mx-auto">
        <StreakSection
          streak={streak}
          disabled={disabled}
          cooldown={cooldown}
          dict={dict}
          updateStreak={updateStreak}
          address={address as Address}
          maxStreak={maxStreak}
        />
        <div>
          <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-xl mt-10">
            {lang === "en" ? <>The future</> : <>Le futur</>}
          </h2>
          <ComingSoon lang={lang} />
        </div>
      </div>
    </>
  );
};

export default Learn;
