import axios from "axios";

export const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

export const refreshIntervalTime = 600000;
