import type { Lang } from "@/types/lang";
import axios from "axios";

export const loadQuizData = async (quizId: number, lang: Lang) => {
  try {
    const quizData = await axios
      .get(`/api/quizzes?lang=${lang}&quizId=${quizId}`)
      .then((response) => {
        return response.data;
      });

    const answersData = await axios
      .get(`/api/answers?lang=${lang}&quizId=${quizId}`)
      .then((response) => {
        return response.data;
      });

    return JSON.stringify({ quiz: quizData, answers: answersData });
  } catch (error) {
    console.error(error);
  }
};
