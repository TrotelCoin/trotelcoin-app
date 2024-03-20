import { Lang } from "@/types/lang";
import axios from "axios";

export const loadQuizData = async (quizId: number, lang: Lang) => {
  const quizData = await axios
    .get(`/api/quizzes?lang=${lang}&quizId=${quizId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));

  const answersData = await axios
    .get(`/api/answers?lang=${lang}&quizId=${quizId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));

  return JSON.stringify({ quiz: quizData, answers: answersData });
};
