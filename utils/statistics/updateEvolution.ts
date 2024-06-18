export const updateEvolution = (
  statistics: number,
  setEvolution: React.Dispatch<React.SetStateAction<number | null>>,
  storedStatistics: number,
  percentage: boolean
) => {
  if (storedStatistics !== null) {
    if (percentage) {
      setEvolution(
        ((Number(statistics) - storedStatistics) / storedStatistics) * 100
      );
    } else {
      setEvolution(Number(statistics) - storedStatistics);
    }
  } else {
    setEvolution(0);
  }
};
