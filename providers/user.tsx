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
  const [quizzesLeft, setQuizzesLeft] = useState<number>(0);

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
    address ? `/api/user/rewards?wallet=${address}` : null,
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
    address ? `/api/user/satisfaction/status?wallet=${address}` : null,
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
    `/api/user/quizzes/time?wallet=${address}`,
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
    `/api/user/marks/average-mark?wallet=${address}`,
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
    address ? `/api/user/quizzes/answered/count?wallet=${address}` : null,
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
    address ? `/api/user/multipliers?wallet=${address}` : null,
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
      quizzesLeft,
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
      quizzesLeft,
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