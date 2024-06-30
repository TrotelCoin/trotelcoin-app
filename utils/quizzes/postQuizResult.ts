import axios from "axios";
import { Address } from "viem";

export const postQuizResult = async (
  quizId: number,
  address: Address,
  numberOfWrongAnswers: number,
  totalQuestions: number
) => {
  await axios.post(`/api/user/quizzes/mark`, {
    quizId,
    wallet: address,
    numberOfWrongAnswers,
    totalQuestions
  });
};
