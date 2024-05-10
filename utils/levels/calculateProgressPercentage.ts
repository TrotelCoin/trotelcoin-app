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
