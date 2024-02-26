"use client";

import { useAddress } from "@thirdweb-dev/react";
import React, { useState, useEffect, useMemo } from "react";
import StreakContext from "@/app/[lang]/streakContext";
import type { ReactNode } from "react";

const StreakProvider = ({ children }: { children: ReactNode }) => {
  const [streak, setStreak] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [lastUpdatedStreak, setLastUpdatedStreak] = useState<string>("");
  const [cooldown, setCooldown] = useState<string>("00:00:00");

  const address = useAddress();

  useEffect(() => {
    const fetchStreak = async () => {
      const result = await fetch(`/api/database/streak?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
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
    } else {
      setStreak(0);
      setCooldown("00:00:00");
      setDisabled(true);
    }
  }, [address, streak, disabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdatedStreak && disabled) {
        const lastUpdated = new Date(lastUpdatedStreak);
        const now = new Date();
        const difference = now.getTime() - lastUpdated.getTime();
        if (difference > 86400000) {
          setCooldown("00:00:00");
        } else {
          const cooldown = 86400000 - difference;
          const cooldownString = new Date(cooldown).toISOString();
          const time = cooldownString.split("T")[1].split(".")[0];
          setCooldown(time);
        }
      } else {
        setCooldown("00:00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdatedStreak, disabled]);

  const contextValue = useMemo(
    () => ({
      streak,
      setStreak,
      disabled,
      cooldown,
      lastUpdatedStreak,
      setLastUpdatedStreak,
      setDisabled,
      setCooldown,
    }),
    [
      streak,
      setStreak,
      disabled,
      cooldown,
      lastUpdatedStreak,
      setLastUpdatedStreak,
      setDisabled,
      setCooldown,
    ]
  );

  return (
    <>
      <StreakContext.Provider value={contextValue}>
        {children}
      </StreakContext.Provider>
    </>
  );
};

export default StreakProvider;
