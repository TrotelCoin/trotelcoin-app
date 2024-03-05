"use client";

import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useMemo, useState } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import type { ReactNode } from "react";
import { Address } from "viem";
import shortenAddress from "@/utils/shortenAddress";
import { fetcher } from "@/lib/axios/fetcher";
import useSWR from "swr";
import { Lang } from "@/types/types";

const UserProvider = ({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Lang;
}) => {
  const [userTotalRewardsPending, setUserTotalRewardsPending] =
    useState<number>(0);
  const [userNumberOfQuizzesAnswered, setUserNumberOfQuizzesAnswered] =
    useState<number>(0);
  const [username, setUsername] = useState<string | null>(null);
  const [isUsernameLoading, setIsUsernameLoading] = useState<boolean>(false);

  const address = useAddress();

  const { data: userTotalRewardsPendingData } = useSWR(
    address
      ? `/api/database/getUserTotalRewardsPending?wallet=${address}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (userTotalRewardsPendingData) {
      setUserTotalRewardsPending(userTotalRewardsPendingData);
    } else {
      setUserTotalRewardsPending(0);
    }
  }, [userTotalRewardsPendingData]);

  const { data: userNumberOfQuizzesAnsweredData } = useSWR(
    address
      ? `/api/database/getUserNumberOfQuizzesAnswered?wallet=${address}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (userNumberOfQuizzesAnsweredData) {
      setUserNumberOfQuizzesAnswered(userNumberOfQuizzesAnsweredData);
    } else {
      setUserNumberOfQuizzesAnswered(0);
    }
  }, [userNumberOfQuizzesAnsweredData]);

  const { data: usernameData, error: errorName } = useSWR(
    address ? `/api/database/getUsername?wallet=${address}` : null,
    fetcher
  );

  const nameError = (name: string) => {
    if (name) {
      if (name.length > 25) {
        return true;
      } else if (name.length < 3) {
        return true;
      } else if (
        name === null ||
        name === "null" ||
        name === "undefined" ||
        name === ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    if ((!usernameData || nameError(usernameData)) && address) {
      setUsername(shortenAddress(address as Address));
      localStorage.setItem("username", shortenAddress(address as Address));
    } else if (usernameData) {
      setUsername(usernameData as string);
      localStorage.setItem("username", usernameData as string);
    } else {
      setUsername(lang === "en" ? "Guest" : "Invité");
      localStorage.removeItem("username");
    }
  }, [usernameData, address]);

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
