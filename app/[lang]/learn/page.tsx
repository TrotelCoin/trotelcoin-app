"use client";

import React, { useEffect, useState } from "react";
import ComingSoon from "@/app/[lang]/ui/interface/comingSoon";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Address } from "viem";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

interface StreaksSectionProps {
  streaks: number;
  disabled: boolean;
  dict: DictType | null;
  cooldown: string;
  updateStreaks: (address: Address) => void;
  address: Address;
  isConnected: boolean;
}

const StreaksSection: React.FC<StreaksSectionProps> = ({
  dict,
  streaks,
  disabled,
  cooldown,
  updateStreaks,
  address,
  isConnected,
}) => (
  <>
    <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
      {typeof dict?.learn !== "string" && <>{dict?.learn.streaks}</>}
    </h2>
    <p>
      {isConnected &&
        (disabled
          ? typeof dict?.learn !== "string" && (
              <>{dict?.learn.streaksDisabled}</>
            )
          : typeof dict?.learn !== "string" && (
              <>{dict?.learn.streaksEnabled}</>
            ))}
      {!isConnected &&
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
          disabled ? "cursor-not-allowed" : "hover:shadow active:shadow-none"
        } bg-gray-50 dark:bg-gray-900 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg p-10 text-gray-900 dark:text-gray-100`}
        onClick={() => {
          if (!disabled) {
            updateStreaks(address);
          }
        }}
      >
        <span className="text-4xl text-center mx-auto">
          {!disabled ? "🔥" : "⏳"}
        </span>
      </button>
      <div className="bg-gray-50 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <span className="text-4xl font-semibold">
          {streaks}
          <p className="font-normal text-base">
            {typeof dict?.learn !== "string" && <>{dict?.learn.streaks}</>}
          </p>
        </span>
      </div>
      <div className="bg-gray-50 col-span-2 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-lg p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <span className="text-4xl font-semibold">
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
  const [streaks, setStreaks] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [lastUpdatedStreak, setLastUpdatedStreak] = useState<string>("");
  const [cooldown, setCooldown] = useState<string>("Loading...");

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchStreaks = async () => {
      const result = await fetch(`/api/database/streaks?wallet=${address}`);
      const data = await result.json();
      setStreaks(data.currentStreaks);
      setLastUpdatedStreak(data.lastUpdated);
      setDisabled(data.disabled);
    };

    if (address) {
      fetchStreaks();
    }
  }, [address]);

  const updateStreaks = async (address: Address) => {
    const result = await fetch(`/api/database/updateStreaks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet: address }),
    });
    // if success from response is true, then setStreaks to streaks + 1
    const data = await result.json();
    if (data.success === "Streaks updated.") {
      setStreaks((streaks) => streaks + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdatedStreak) {
        const lastUpdated = new Date(lastUpdatedStreak);
        const now = new Date();
        const difference = now.getTime() - lastUpdated.getTime();
        const cooldown = 86400000 - difference;
        const cooldownString = new Date(cooldown).toISOString();
        const time = cooldownString.split("T")[1].split(".")[0];
        setCooldown(time);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdatedStreak]);

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <StreaksSection
          streaks={streaks}
          disabled={disabled}
          cooldown={cooldown}
          dict={dict}
          updateStreaks={updateStreaks}
          address={address as Address}
          isConnected={isConnected}
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
