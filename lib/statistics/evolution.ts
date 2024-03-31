export const updateEvolution = (
  statistics: number,
  statisticsName: string,
  setEvolution: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const lastUpdated = localStorage.getItem("lastUpdated");
  const oneWeek = 1000 * 60 * 60 * 24 * 7;

  if (
    statistics &&
    (!lastUpdated || Date.now() - Number(lastUpdated) > oneWeek)
  ) {
    localStorage.setItem(statisticsName, String(statistics));
    localStorage.setItem("lastUpdated", new Date().toISOString());
  }

  if (statistics && localStorage.getItem(statisticsName)) {
    const storedStatisticsString = localStorage.getItem(statisticsName);
    const storedStatisticsCount = Number(storedStatisticsString);
    if (storedStatisticsCount !== null) {
      setEvolution(Number(statistics) - storedStatisticsCount);
    } else {
      setEvolution(0);
    }
  }
};
