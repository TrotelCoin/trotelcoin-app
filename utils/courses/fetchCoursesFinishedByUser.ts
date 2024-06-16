import axios from "axios";
import { Address } from "viem";

export async function fetchCoursesFinishedByUser(wallet: Address) {
  const result = await axios
    .get(`/api/user/courses/courses-completed?wallet=${wallet}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  return result;
}
