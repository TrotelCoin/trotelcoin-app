import { useEffect } from "react";

export const calculateUserLevel = (quizzesCompleted: number) => {
  let userLevel = 1;
  let quizzesRequired = 1;

  while (quizzesCompleted >= quizzesRequired) {
    quizzesCompleted -= quizzesRequired;
    userLevel++;
    quizzesRequired++;
  }

  const quizzesRemaining = quizzesRequired + 1 - quizzesCompleted;

  return {
    userLevel,
    quizzesRemaining,
    quizzesRequired,
  };
};

export const calculateProgressPercentage = (quizzesCompleted: number) => {
  let userLevel = 1;
  let quizzesRequired = 1;

  while (quizzesCompleted >= quizzesRequired) {
    quizzesCompleted -= quizzesRequired;
    userLevel++;
    quizzesRequired++;
  }

  return ((quizzesCompleted / quizzesRequired) * 100) % 100;
};

export const incrementWidth = (
  progressPercentage: number,
  setWidth: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((oldWidth: number) => {
        if (oldWidth < progressPercentage) {
          return oldWidth + 1;
        } else {
          clearInterval(interval);
          return oldWidth;
        }
      });
    }, 1);

    return () => clearInterval(interval);
  }, [progressPercentage]);
};
