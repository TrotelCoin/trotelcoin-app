import axios from "axios";

export const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

export const refreshIntervalTime = 10 * 1e3; // 10 seconds
