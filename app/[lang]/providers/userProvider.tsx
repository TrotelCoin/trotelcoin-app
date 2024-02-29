"use client";

import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useMemo, useState } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import type { ReactNode } from "react";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userTotalRewards, setUserTotalRewards] = useState<number>(0);
  const [userNumberOfQuizzesAnswered, setUserNumberOfQuizzesAnswered] =
    useState<number>(0);
  const [username, setUsername] = useState<string | null>(null);
  const [isUsernameLoading, setIsUsernameLoading] = useState<boolean>(false);

  const address = useAddress();

  useEffect(() => {
    const fetchUserTotalRewards = async () => {
      const result = await fetch(
        `/api/database/getUserTotalRewards?wallet=${address}`,
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
      setUserTotalRewards(data);
    };

    if (address) {
      fetchUserTotalRewards();
    }
  }, [address]);

  useEffect(() => {
    const fetchUserNumberOfQuizzesAnswered = async () => {
      const result = await fetch(
        `/api/database/getUserNumberOfQuizzesAnswered?wallet=${address}`,
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
      setUserNumberOfQuizzesAnswered(data);
    };

    if (address) {
      fetchUserNumberOfQuizzesAnswered();
    }
  }, [address]);

  useEffect(() => {
    const fetchUsername = async () => {
      const result = await fetch(
        `/api/database/getUsername?wallet=${address}`,
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
      setUsername(data);
      localStorage.setItem("username", data as string);
    };

    if (address) {
      setIsUsernameLoading(true);
      fetchUsername();
      setIsUsernameLoading(false);
    }
  }, [address]);

  const contextValue = useMemo(
    () => ({
      userTotalRewards,
      userNumberOfQuizzesAnswered,
      username,
      setUsername,
      isUsernameLoading,
    }),
    [
      userTotalRewards,
      userNumberOfQuizzesAnswered,
      username,
      setUsername,
      isUsernameLoading,
    ]
  );

  return (
    <>
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
