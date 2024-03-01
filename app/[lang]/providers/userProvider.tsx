"use client";

import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useMemo, useState } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import type { ReactNode } from "react";
import { Address } from "viem";
import shortenAddress from "@/utils/shortenAddress";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userTotalRewardsPending, setUserTotalRewardsPending] =
    useState<number>(0);
  const [userNumberOfQuizzesAnswered, setUserNumberOfQuizzesAnswered] =
    useState<number>(0);
  const [username, setUsername] = useState<string | null>(null);
  const [isUsernameLoading, setIsUsernameLoading] = useState<boolean>(false);

  const address = useAddress();

  useEffect(() => {
    const fetchUserTotalRewards = async () => {
      try {
        const result = await fetch(
          `/api/database/getUserTotalRewardsPending?wallet=${address}`,
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
        setUserTotalRewardsPending(data);
      } catch (error) {
        console.error(error);
      }
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
      if (data === null) {
        setUsername(shortenAddress(address as Address));
        localStorage.setItem("username", shortenAddress(address as Address));
        return;
      } else {
        setUsername(data);
        localStorage.setItem("username", data as string);
        return;
      }
    };

    if (address) {
      setIsUsernameLoading(true);
      fetchUsername();
      setIsUsernameLoading(false);
    }
  }, [address]);

  const contextValue = useMemo(
    () => ({
      userTotalRewardsPending,
      userNumberOfQuizzesAnswered,
      username,
      setUsername,
      isUsernameLoading,
    }),
    [
      userTotalRewardsPending,
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
