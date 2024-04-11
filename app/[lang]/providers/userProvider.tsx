"use client";

import { useAccount } from "wagmi";
import React, { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import type { ReactNode } from "react";
import { fetcher, refreshIntervalTime } from "@/lib/axios/fetcher";
import useSWR from "swr";
import type { Lang } from "@/types/lang";
import { useSession } from "next-auth/react";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import { calculateUserLevel } from "@/utils/level";

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [multipliers, setMultipliers] = useState<number>(1);
  const [learningTime, setLearningTime] = useState<number>(0);
  const [averageMark, setAverageMark] = useState<number>(0);
  const [multipliersItem, setMultipliersItem] = useState<number>(1);
  const [multipliersItemTimeLeft, setMultipliersItemTimeLeft] =
    useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [multipliersEnabled, setMultipliersEnabled] = useState<boolean>(false);

  const { address } = useAccount();
  const { data: session } = useSession();
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  useEffect(() => {
    if (session && address) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session, address]);

  const { data: userTotalRewardsPendingData } = useSWR(
    address
      ? `/api/database/getUserTotalRewardsPending?wallet=${address}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (userTotalRewardsPendingData) {
      setUserTotalRewardsPending(userTotalRewardsPendingData);
    } else {
      setUserTotalRewardsPending(0);
    }
  }, [userTotalRewardsPendingData]);

  const { data: alreadyAnsweredSatisfactionData } = useSWR(
    address
      ? `/api/database/getUserAlreadyAnsweredSatisfaction?wallet=${address}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (alreadyAnsweredSatisfactionData) {
      setAlreadyAnsweredSatisfaction(alreadyAnsweredSatisfactionData);
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
  }, [alreadyAnsweredSatisfactionData]);

  const { data: learningTimeData } = useSWR(
    `/api/database/getUserQuizzesTime?wallet=${address}`,
    fetcher,
    {
      refreshInterval: refreshIntervalTime,
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );

  useEffect(() => {
    if (learningTimeData) {
      setLearningTime(learningTimeData);
    } else {
      setLearningTime(0);
    }
  }, [learningTimeData]);

  const { data: averageMarkData } = useSWR(
    `/api/database/getUserAverageMark?wallet=${address}`,
    fetcher,
    {
      refreshInterval: refreshIntervalTime,
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );

  useEffect(() => {
    if (averageMarkData) {
      setAverageMark(averageMarkData);
    } else {
      setAverageMark(0);
    }
  }, [averageMarkData]);

  const { data: userNumberOfQuizzesAnsweredData } = useSWR(
    address
      ? `/api/database/getUserNumberOfQuizzesAnswered?wallet=${address}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (userNumberOfQuizzesAnsweredData) {
      setUserNumberOfQuizzesAnswered(userNumberOfQuizzesAnsweredData);
    } else {
      setUserNumberOfQuizzesAnswered(0);
    }
  }, [userNumberOfQuizzesAnsweredData]);

  const { data: userMultipliersData } = useSWR(
    address ? `/api/items/getUserMultipliers?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime,
    }
  );

  useEffect(() => {
    if (userMultipliersData) {
      setMultipliersItem(userMultipliersData.multipliers);
      setMultipliersItemTimeLeft(userMultipliersData.timeLeft);
      setMultipliersEnabled(userMultipliersData.multipliersEnabled);
    } else {
      setMultipliersItem(1);
      setMultipliersItemTimeLeft(0);
      setMultipliersEnabled(false);
    }
  }, [userMultipliersData]);

  useEffect(() => {
    let multipliers: number = 1;

    if (isIntermediate) {
      multipliers = 3;
    }

    if (isExpert) {
      multipliers = 5;
    }

    if (multipliersItem && multipliersItemTimeLeft > 0) {
      multipliers *= multipliersItem;
    }

    setMultipliers(multipliers);
  }, [isIntermediate, isExpert, multipliersItem, multipliersItemTimeLeft]);

  useEffect(() => {
    if (userNumberOfQuizzesAnswered) {
      const level = calculateUserLevel(userNumberOfQuizzesAnswered);
      setUserLevel(level.userLevel);
    } else {
      setUserLevel(1);
    }
  }, [userNumberOfQuizzesAnswered]);

  const contextValue = useMemo(
    () => ({
      userTotalRewardsPending,
      userNumberOfQuizzesAnswered,
      alreadyAnsweredSatisfaction,
      setAlreadyAnsweredSatisfaction,
      isLoggedIn,
      multipliers,
      learningTime,
      averageMark,
      multipliersItem,
      multipliersItemTimeLeft,
      userLevel,
      multipliersEnabled,
    }),
    [
      userTotalRewardsPending,
      userNumberOfQuizzesAnswered,
      alreadyAnsweredSatisfaction,
      setAlreadyAnsweredSatisfaction,
      isLoggedIn,
      multipliers,
      learningTime,
      averageMark,
      multipliersItem,
      multipliersItemTimeLeft,
      userLevel,
      multipliersEnabled,
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
