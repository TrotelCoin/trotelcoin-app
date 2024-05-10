import { StatisticsType } from "@/types/statistics/statistics";
import axios from "axios";

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

export const updateStatistics = async (
  statsName: StatisticsType,
  value: number
) => {
  await axios.post(`/api/statistics?stats=${statsName}&value=${value}`);
};
