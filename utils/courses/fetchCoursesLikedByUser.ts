import axios from "axios";
import { Address } from "viem";
import type { CourseRating } from "@/types/courses/courses";

export async function fetchCoursesLikedByUser(wallet: Address) {
  let result = await axios
    .get(`/api/user/courses/satisfaction?wallet=${wallet}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  result.filter((course: CourseRating) => course.rating > 3);

  return result;
}
