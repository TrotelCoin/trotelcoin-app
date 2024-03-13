"use client";

import { useAccount } from "wagmi";
import React, { useEffect, useMemo, useState } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import type { ReactNode } from "react";
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
  const [alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction] =
    useState<boolean>(false);

  const { address } = useAccount();

  const { data: userTotalRewardsPendingData } = useSWR(
    address
      ? `/api/database/getUserTotalRewardsPending?wallet=${address}`
      : null,
    fetcher
  );

  const { data: alreadyAnsweredSatisfactionData } = useSWR(
    address
      ? `/api/database/getUserAlreadyAnsweredSatisfaction?wallet=${address}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (alreadyAnsweredSatisfactionData) {
      setAlreadyAnsweredSatisfaction(alreadyAnsweredSatisfactionData);
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
  }, [alreadyAnsweredSatisfactionData]);

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

  const contextValue = useMemo(
    () => ({
      userTotalRewardsPending,
      userNumberOfQuizzesAnswered,
      alreadyAnsweredSatisfaction,
      setAlreadyAnsweredSatisfaction,
    }),
    [
      userTotalRewardsPending,
      userNumberOfQuizzesAnswered,
      alreadyAnsweredSatisfaction,
      setAlreadyAnsweredSatisfaction,
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
