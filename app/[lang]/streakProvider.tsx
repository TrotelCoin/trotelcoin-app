"use client";

import { useAddress } from "@thirdweb-dev/react";
import React, { useState, useEffect, useMemo } from "react";
import StreakContext from "@/app/[lang]/streakContext";
import type { ReactNode } from "react";
import { Address } from "viem";

const StreakProvider = ({ children }: { children: ReactNode }) => {
  const [streak, setStreak] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [lastUpdatedStreak, setLastUpdatedStreak] = useState<string>("");
  const [cooldown, setCooldown] = useState<string>("00:00:00");
  const [maxStreak, setMaxStreak] = useState<number>(0);

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

  useEffect(() => {
    const fetchMaxStreak = async () => {
      const result = await fetch(
        `/api/database/userMaxStreak?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const data = await result.json();
      setMaxStreak(data);
    };

    if (address) {
      fetchMaxStreak();
    } else {
      setMaxStreak(0);
    }
  }, [address, maxStreak]);

  const updateStreak = async (address: Address) => {
    const result = await fetch(`/api/database/updateStreak?wallet=${address}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      cache: "no-store",
    });
    // if success from response is true, then setStreak to streak + 1
    const data = await result.json();
    if (data.success === "Streak updated.") {
      setStreak((streak: number) => streak + 1);
      setMaxStreak((maxStreak: number) => Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
      setMaxStreak(0);
    }
  };

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
      updateStreak,
      maxStreak,
      setMaxStreak,
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
      updateStreak,
      maxStreak,
      setMaxStreak,
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
