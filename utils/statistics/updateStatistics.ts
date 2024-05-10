import { StatisticsType } from "@/types/statistics/statistics";
import axios from "axios";

export const updateStatistics = async (
  statsName: StatisticsType,
  value: number
) => {
  await axios.post(`/api/statistics?stats=${statsName}&value=${value}`);
};
