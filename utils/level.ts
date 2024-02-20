import { useEffect } from "react";

export const calculateUserLevelAndTokens = (tokensEarned: number) => {
  let userLevel = 1;
  let tokensRequiredForCurrentLevel = 10;
  const levelIntervalIncrease = 10;
  let nextLevelIncrease = levelIntervalIncrease;

  while (tokensEarned >= tokensRequiredForCurrentLevel) {
    if (userLevel % levelIntervalIncrease === 0) {
      tokensRequiredForCurrentLevel *= 2;
      nextLevelIncrease += levelIntervalIncrease;
    }

    tokensRequiredForCurrentLevel += nextLevelIncrease;
    userLevel++;
  }

  let tokensNeededForNextLevel = tokensRequiredForCurrentLevel - tokensEarned;

  if (tokensNeededForNextLevel <= 0) {
    tokensNeededForNextLevel =
      tokensRequiredForCurrentLevel + nextLevelIncrease - tokensEarned;
  }

  userLevel = Math.max(userLevel, 1);

  return {
    userLevel,
    tokensNeededForNextLevel,
    tokensRequiredForCurrentLevel,
    nextLevelIncrease,
  };
};

export const calculateProgressPercentage = (
  tokensRequiredForCurrentLevel: number,
  tokensEarned: number,
  tokensNeededForNextLevel: number,
  nextLevelIncrease: number
) => {
  const progressTowardsNextLevel =
    tokensEarned - tokensRequiredForCurrentLevel + nextLevelIncrease;
  const totalTokensForNextLevel =
    tokensNeededForNextLevel + progressTowardsNextLevel;

  return (progressTowardsNextLevel / totalTokensForNextLevel) * 100;
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
