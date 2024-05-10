"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect, useMemo } from "react";
import StreakContext from "@/contexts/streak";
import type { ReactNode } from "react";
import { Address } from "viem";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import axios from "axios";
import type { Lang } from "@/types/language/lang";

const StreakProvider = ({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Lang;
}) => {
  const [streak, setStreak] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [lastUpdatedStreak, setLastUpdatedStreak] = useState<string>("");
  const [cooldown, setCooldown] = useState<string>("00:00:00");
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [isStreakLoading, setIsStreakLoading] = useState<boolean>(false);
  const [streakResetMessage, setStreakResetMessage] = useState<boolean>(false);
  const [streakMessage, setStreakMessage] = useState<boolean>(false);
  const [lostStreakAt, setLostStreakAt] = useState<Date | null>(null);
  const [lostStreak, setLostStreak] = useState<boolean>(false);

  const { address } = useAccount();

  const { data: userStreak } = useSWR(
    address ? `/api/user/streak?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (userStreak) {
      setStreak(userStreak.currentStreak);
      setLastUpdatedStreak(userStreak.lastUpdated);
      setDisabled(userStreak.disabled);
      const lostStreakAtDate = new Date(userStreak.lostStreakAt);
      setLostStreakAt(lostStreakAtDate);
      setLostStreak(userStreak.lostStreak);
    } else {
      setStreak(0);
      setMaxStreak(0);
      setCooldown("00:00:00");
      setDisabled(true);
      setLostStreak(false);
    }
  }, [userStreak]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdatedStreak && disabled && address) {
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
  }, [lastUpdatedStreak, disabled, address]);

  const { data: userMaxStreak } = useSWR(
    address ? `/api/user/streak/max-streak?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (userMaxStreak) {
      setMaxStreak(userMaxStreak);
    } else {
      setMaxStreak(0);
    }
  }, [userMaxStreak]);

  useEffect(() => {
    if (!disabled && address) {
      setStreakResetMessage(true);
    }
  }, [disabled, address]);

  const updateStreak = async (address: Address) => {
    setIsStreakLoading(true);

    await axios
      .post(`/api/user/streak?wallet=${address}`)
      .then(() => {
        setStreak((streak: number) => streak + 1);
        setMaxStreak((maxStreak: number) => Math.max(maxStreak, streak + 1));
        setLastUpdatedStreak(new Date().toISOString());
        setDisabled(true);
        setStreakMessage(true);
      })
      .catch((error) => {
        console.error(error);
        setStreak(0);
        setMaxStreak(0);
        setDisabled(false);
        setCooldown("00:00:00");
        setStreakMessage(false);
      });

    setIsStreakLoading(false);
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
      isStreakLoading,
      setIsStreakLoading,
      streakResetMessage,
      streakMessage,
      lostStreakAt,
      lostStreak,
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
      isStreakLoading,
      setIsStreakLoading,
      streakResetMessage,
      streakMessage,
      lostStreakAt,
      lostStreak,
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