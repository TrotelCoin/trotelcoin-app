"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect, useMemo, useContext } from "react";
import LifeContext from "@/contexts/life";
import type { ReactNode } from "react";
import axios from "axios";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import type { Lang } from "@/types/language/lang";
import PremiumContext from "@/contexts/premium";

const LifeProvider = ({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Lang;
}) => {
  const [life, setLife] = useState<number | null>(null);
  const [lifeCooldown, setLifeCooldown] = useState<string>("00:00:00");
  const [lastReset, setLastReset] = useState<string>("");
  const [lifeResetMessage, setLifeResetMessage] = useState<boolean>(false);

  const { address } = useAccount();
  const { isNotPremium } = useContext(PremiumContext);

  const updateLife = async () => {
    await axios.post(`/api/user/life?wallet=${address}`);

    setLife(life ? life - 1 : 0);
  };

  const { data: lifeData } = useSWR(
    address ? `/api/user/life?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (lifeData) {
      setLife(Math.max(0, lifeData));
    } else {
      setLife(3);
    }
  }, [lifeData]);

  useEffect(() => {
    if (life && life > 2 && isNotPremium && address) {
      setLifeResetMessage(true);
    }
  }, [life, isNotPremium, address]);

  const { data: lifeLastReset } = useSWR(
    address ? `/api/user/life/last-reset?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (lifeLastReset) {
      setLastReset(lifeLastReset);
    } else {
      setLifeCooldown("00:00:00");
    }
  }, [lifeLastReset]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastReset) {
        const lastUpdated = new Date(lastReset);
        const now = new Date();
        const difference = now.getTime() - lastUpdated.getTime();
        if (difference > 86400000) {
          setLifeCooldown("00:00:00");
        } else {
          const cooldown = 86400000 - difference;
          const cooldownString = new Date(cooldown).toISOString();
          const time = cooldownString.split("T")[1].split(".")[0];
          setLifeCooldown(time);
        }
      } else {
        setLifeCooldown("00:00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastReset]);

  const contextValue = useMemo(
    () => ({
      updateLife,
      life,
      setLife,
      lifeCooldown,
      setLifeCooldown,
      lastReset,
      setLastReset,
      lifeResetMessage,
    }),
    [
      updateLife,
      life,
      setLife,
      lifeCooldown,
      setLifeCooldown,
      lastReset,
      setLastReset,
      lifeResetMessage,
    ]
  );

  return (
    <>
      <LifeContext.Provider value={contextValue}>
        {children}
      </LifeContext.Provider>
    </>
  );
};

export default LifeProvider;
