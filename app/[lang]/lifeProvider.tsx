"use client";

import { useAddress, useUser } from "@thirdweb-dev/react";
import React, { useState, useEffect, useMemo } from "react";
import LifeContext from "@/app/[lang]/lifeContext";
import type { ReactNode } from "react";

const LifeProvider = ({ children }: { children: ReactNode }) => {
  const [life, setLife] = useState<number>(0);

  const address = useAddress();
  const user = useUser();

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

    if (address && user) {
      fetchUserLife();

      const interval = setInterval(fetchUserLife, 10000);

      return () => clearInterval(interval);
    } else {
      setLife(3);
    }
  }, [address, user]);

  const contextValue = useMemo(
    () => ({ updateLife, life, setLife }),
    [updateLife, life, setLife]
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
