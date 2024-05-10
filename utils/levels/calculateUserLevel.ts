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
