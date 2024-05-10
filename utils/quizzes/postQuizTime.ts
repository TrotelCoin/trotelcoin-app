import axios from "axios";
import { Address } from "viem";

export const postQuizTime = async (
  quizId: number,
  address: Address,
  diffTime: number
) => {
  await axios.post(
    `/api/user/quizzes/time?quizId=${quizId}&wallet=${address}&diffTime=${diffTime}`
  );
};
