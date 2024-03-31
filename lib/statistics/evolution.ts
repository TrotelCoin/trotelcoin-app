import { StatisticsType } from "@/types/statistics/statistics";
import axios from "axios";

export const updateEvolution = (
  statistics: number,
  statisticsName: string,
  setEvolution: React.Dispatch<React.SetStateAction<number | null>>,
  storedStatistics: number
) => {
  if (storedStatistics !== null) {
    setEvolution(Number(statistics) - storedStatistics);
  } else {
    setEvolution(0);
  }
};

export const updateStatistics = async (
  statsName: StatisticsType,
  value: number
) => {
  await axios.post(
    `/api/statistics/updateStatistics?stats=${statsName}&value=${value}`
  );
};
