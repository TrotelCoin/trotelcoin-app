"use client";

import { useAddress } from "@thirdweb-dev/react";
import React, { useState, useEffect, useMemo } from "react";
import LifeContext from "@/app/[lang]/lifeContext";
import type { ReactNode } from "react";

const LifeProvider = ({ children }: { children: ReactNode }) => {
  const [life, setLife] = useState<number>(0);
  const [lifeCooldown, setLifeCooldown] = useState<string>("00:00:00");
  const [lastReset, setLastReset] = useState<string>("");

  const address = useAddress();

  const updateLife = async () => {
    await fetch(`/api/database/updateLife?wallet=${address}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      cache: "no-store",
    });

    setLife(life - 1);
  };

  useEffect(() => {
    const fetchUserLife = async () => {
      await fetch(`/api/database/life?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          setLife(data);
        });
    };

    if (address) {
      fetchUserLife();
    } else {
      setLife(3);
    }
  }, [address]);

  useEffect(() => {
    const fetchLifeCooldown = async () => {
      const result = await fetch(
        `/api/database/resetLifeCount?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const lastReset = await result.json();
      setLastReset(lastReset);
    };

    if (address) {
      fetchLifeCooldown();
    } else {
      setLifeCooldown("00:00:00");
    }
  }, [address]);

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
    }),
    [
      updateLife,
      life,
      setLife,
      lifeCooldown,
      setLifeCooldown,
      lastReset,
      setLastReset,
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
