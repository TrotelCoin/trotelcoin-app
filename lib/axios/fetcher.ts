import axios from "axios";

export const fetcher = (url: string) =>
  axios
    .get(url, { headers: { "Cache-Control": "no-store" } })
    .then((response) => response.data);
