"use client";

import { useAccount } from "wagmi";
import React, { useContext, useEffect, useMemo, useState } from "react";
import UserContext from "@/contexts/user";
import type { ReactNode } from "react";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import type { Lang } from "@/types/language/lang";
import { useSession } from "next-auth/react";
import PremiumContext from "@/contexts/premium";
import { calculateUserLevel } from "@/utils/levels/calculateUserLevel";

const UserProvider = ({
  children,
  lang
}: {
  children: ReactNode;
  lang: Lang;
}) => {
  const [userTotalRewardsPending, setUserTotalRewardsPending] = useState<
    number | null
  >(null);
  const [userNumberOfQuizzesAnswered, setUserNumberOfQuizzesAnswered] =
    useState<number | null>(null);
  const [alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction] =
    useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [multipliers, setMultipliers] = useState<number | null>(null);
  const [learningTime, setLearningTime] = useState<number | null>(null);
  const [averageMark, setAverageMark] = useState<number | null>(null);
  const [multipliersItem, setMultipliersItem] = useState<number | null>(null);
  const [multipliersItemTimeLeft, setMultipliersItemTimeLeft] = useState<
    number | null
  >(null);
  const [userLevel, setUserLevel] = useState<number | null>(null);
  const [multipliersEnabled, setMultipliersEnabled] = useState<boolean>(false);
  const [quizzesLeft, setQuizzesLeft] = useState<number | null>(null);

  const { address } = useAccount();
  const { data: session } = useSession();
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  useEffect(() => {
    if (!!session && !!address) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session, address]);

  const { data: userTotalRewardsPendingData } = useSWR(
    address ? `/api/user/rewards?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
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
    address ? `/api/user/satisfaction/status?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
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
    address ? `/api/user/quizzes/time?wallet=${address}` : null,
    fetcher,
    {
      refreshInterval: refreshIntervalTime,
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true
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
    `/api/user/marks/average-mark?wallet=${address}`,
    fetcher,
    {
      refreshInterval: refreshIntervalTime,
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true
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
    address ? `/api/user/quizzes/answered/count?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
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
    address ? `/api/user/multipliers?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
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

    if (
      multipliersItem &&
      multipliersItemTimeLeft &&
      multipliersItemTimeLeft > 0
    ) {
      multipliers *= multipliersItem;
    }

    setMultipliers(multipliers);
  }, [isIntermediate, isExpert, multipliersItem, multipliersItemTimeLeft]);

  useEffect(() => {
    if (userNumberOfQuizzesAnswered) {
      const level = calculateUserLevel(userNumberOfQuizzesAnswered);
      setUserLevel(level.userLevel);
      setQuizzesLeft(level.quizzesRemaining);
    } else {
      setUserLevel(1);
      setQuizzesLeft(0);
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
      quizzesLeft
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
      quizzesLeft
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
