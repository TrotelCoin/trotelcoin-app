export const updateEvolution = (
  statistics: number,
  statisticsName: string,
  setEvolution: React.Dispatch<React.SetStateAction<number | null>>,
  storedStatistics: number
) => {
  if (storedStatistics !== null) {
    const percentage =
      ((statistics - storedStatistics) / storedStatistics) * 100;
    setEvolution(percentage);
  } else {
    setEvolution(0);
  }
};
